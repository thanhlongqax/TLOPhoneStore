import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,Between, MoreThanOrEqual } from 'typeorm';
import { Order, OrderItem, Customer, Product } from '@app/entity';
import { ProductService } from '@app/service';
import { ApiResponseDto, CreateOrderDto } from '@app/dto';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<any> {
    try {
      let customer = await this.customerRepository.findOne({
        where: { customer_phone: data.customer.customer_phone },
      });
      if (!customer) {
        customer = this.customerRepository.create({
          customer_phone: data.customer.customer_phone,
          customer_name: data.customer.customer_name || null,
          customer_email: null,
          customer_address: data.customer.customer_address || null,
          membership_level: "NEW",
          points_balance: 0,
          last_purchase_date: null,
          total_spent: 0,
        });
        await this.customerRepository.save(customer);
      }
      const order = this.orderRepository.create({
        ...data,
        customer,
        order_date : new Date(),
        amount_paid : data.amount_paid,
        refund_amount : data.refund_amount,
        total_price: 0
      });
      const savedOrder = await this.orderRepository.save(order);
      let totalPrice = 0;
      if (data.order.orderItems) {
        for (const itemData of data.order.orderItems) {
          if (!itemData.quantity || !itemData.product || !itemData.product.product_id ) {
            throw new Error('Order phải sản phẩm và số lượng.');
          }
          const product = await this.productRepository.findOne({where : {product_id : itemData.product.product_id }});
          if (!product) {
            throw new Error('Không tìm thấy sản phẩm.');
          }
          const orderItem = this.orderItemRepository.create({
            ...itemData,
            order: savedOrder,
            product : product
          });
          const savedOrderItem = await this.orderItemRepository.save(orderItem);
          const orderItemFromDb = await this.orderItemRepository.findOne({
            where: { order_item_id: savedOrderItem.order_item_id },
          });

          if (orderItemFromDb && orderItemFromDb.price) {
            totalPrice += orderItemFromDb.price;
          }
        }
      }
      await this.orderRepository.update(savedOrder.order_id, { total_price: totalPrice });
      return new ApiResponseDto(200 , true , "Đã tạo đơn hàng thành công" , {order_id : savedOrder.order_id});
    }catch (e){
      throw new BadRequestException(e);
    }
  }

  async getOrderById(orderId: number) {
    return this.orderRepository.findOne({
      where: { order_id: orderId },
      relations: ['customer', 'orderItems', 'orderItems.product'],
    });
  }

  async findOne(id: number): Promise<any> {
    try {
      const order= await this.orderRepository.findOne({ where: { order_id: id }, relations: ['orderItems', 'orderItems.product','customer'] });
      if (!order) {
        throw  new Error("Không tìm thấy đơn hàng")
      }
      return new ApiResponseDto(200 , true , "Lấy đơn hàng thành công " , order)
    }catch (e){
      throw new NotFoundException(e);
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['orderItems'] });
  }

  async update(id: number, data: Partial<Order>): Promise<Order> {
    await this.orderRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async findOrderItemsByOrder(id: number): Promise<OrderItem[]> {
    const order = await this.findOne(id);
    return order.orderItems;
  }
  async getCustomerOrderHistory(
    customerId: string,
    page: number = 1,
    limit: number = 10,
    searchTerm?: string
  ): Promise<any> {
    try {
      const queryBuilder = this.customerRepository
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.orders', 'order')
        .where('customer.customer_id = :customerId', { customerId });

      if (searchTerm) {
        queryBuilder.andWhere(
          '(order.order_id LIKE :search OR order.order_date LIKE :search)',
          { search: `%${searchTerm}%` }
        );
      }
      const [data, total] = await queryBuilder
        .take(limit)
        .skip((page - 1) * limit)
        .getManyAndCount();

      if (!data.length) {
        throw new Error('Không tìm thấy lịch sử đặt hàng của khách hàng');
      }

      return {data, total};
    } catch (error) {
      throw new BadRequestException(error || 'Lấy lịch sử đặt hàng thất bại');
    }
  }
  async getTodayReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const orders = await this.orderRepository.find({
      where: {
        updatedAt: Between(today, tomorrow),
      },
      relations: ['orderItems'],
    });
    console.log(orders)
    return this.generateReport(orders);
  }

  async getYesterdayReport() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const orders = await this.orderRepository.find({
      where: { updatedAt: yesterday },
      relations: ['orderItems'],
    });
    return this.generateReport(orders);
  }

  async getLast7DaysReport() {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const orders = await this.orderRepository.find({
      where: { updatedAt: MoreThanOrEqual(last7Days) },
      relations: ['orderItems'],
    });
    return this.generateReport(orders);
  }

  async getThisMonthReport() {
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    const orders = await this.orderRepository.find({
      where: { updatedAt: MoreThanOrEqual(firstDayOfMonth) },
      relations: ['orderItems'],
    });
    return this.generateReport(orders);
  }

  async getReportByDateRange(startDate: Date, endDate: Date) {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23,59,59,999);
    const orders = await this.orderRepository.find({
      where: { updatedAt: Between(startDate, endDate) },
      relations: ['orderItems'],
    });
    return this.generateReport(orders);
  }

  private generateReport(orders: Order[]) {
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalProducts = 0;

    orders.forEach(order => {
      totalRevenue += order.total_price;
      totalOrders += 1;
      totalProducts += order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
    });

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      orders,
    };
  }
}
