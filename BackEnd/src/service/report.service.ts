import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { Order } from '@app/entity';
import { ApiResponseDto } from '@app/dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getTodayReport(page = 1, limit = 10) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const skip = (page - 1) * limit;

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: Between(today, tomorrow) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho ngày hôm nay');

      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: Between(today, tomorrow) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });
      const { totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid } = this.generateReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo theo ngày hôm nay thành công " ,{ orders, totalPage, totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid} )
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async getYesterdayReport(page = 1, limit = 10) {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(23, 59, 59, 0);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: Between(yesterday, today) },
        relations: ['orderItems', 'orderItems.product'],
      });
      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho ngày qua');

      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: Between(yesterday, today) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const { totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid } = this.generateReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo ngày hôm qua thành công " ,{ orders, totalPage, totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid} )
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getLast7DaysReport(page = 1, limit = 10) {
    try {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: MoreThanOrEqual(last7Days) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho 7 ngày trước');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: MoreThanOrEqual(last7Days) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });
      if (!orders.length) throw new Error('Không tìm thấy báo cáo 7 ngày trước');
      const { totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid } = this.generateReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo ngày hôm qua thành công " ,{ orders, totalPage, totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid} )
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getThisMonthReport(page = 1, limit = 10) {
    try {
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: MoreThanOrEqual(firstDayOfMonth) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho tháng này');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: MoreThanOrEqual(firstDayOfMonth) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const { totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid } = this.generateReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo ngày hôm qua thành công " ,{ orders, totalPage, totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid} )
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getReportByDateRange(startDate: Date, endDate: Date , page = 1, limit = 10) {
    try {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: Between(startDate, endDate) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error("Không tìm báo cáo cho khoảng thời gian trên")
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: Between(startDate, endDate) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const { totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid } = this.generateReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo ngày hôm qua thành công " ,{ orders, totalPage, totalRevenue, totalOrders, totalProducts, totalProfit, amount_paid} )
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  private generateReport(orders: Order[]) {
    let totalRevenue = 0;
    let totalProfit = 0;
    let totalOrders = 0;
    let totalProducts = 0;
    let amount_paid = 0;
    orders.forEach(order => {
      totalRevenue += order.total_price;
      totalOrders += 1;
      amount_paid+= order.amount_paid;
      order.orderItems.forEach(orderItem => {
        totalProfit += orderItem.quantity * orderItem.product.product_base_price;
      })
      totalProducts += order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
    });
    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalProfit,
      amount_paid,
      orders
    };
  }

  async getUserTodayReport(page = 1, limit = 10) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: Between(today, tomorrow) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho ngày hôm nay');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: Between(today, tomorrow) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const {  totalOrders, totalProducts, amount_paid } = this.generateUserReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo ngày hôm nay thành công " ,{ orders, totalPage, totalOrders, totalProducts, amount_paid})
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getUserYesterdayReport(page = 1, limit = 10) {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: Between(yesterday, today) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho ngày hôm qua');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: Between(yesterday, today) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const {  totalOrders, totalProducts, amount_paid } = this.generateUserReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo ngày hôm qua thành công " ,{ orders, totalPage, totalOrders, totalProducts, amount_paid})
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getUserLast7DaysReport(page = 1, limit = 10) {
    try {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: MoreThanOrEqual(last7Days) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho 7 ngày trước');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: MoreThanOrEqual(last7Days) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const {  totalOrders, totalProducts, amount_paid } = this.generateUserReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo 7 ngày trước thành công " ,{ orders, totalPage, totalOrders, totalProducts, amount_paid})
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getUserThisMonthReport(page = 1, limit = 10) {
    try {
      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: MoreThanOrEqual(firstDayOfMonth) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho 1 tháng');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: MoreThanOrEqual(firstDayOfMonth) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const {  totalOrders, totalProducts, amount_paid } = this.generateUserReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo 1 tháng qua thành công " ,{ orders, totalPage, totalOrders, totalProducts, amount_paid})
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getUserReportByDateRange(startDate: Date, endDate: Date , page = 1, limit = 10) {
    try {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const orderCount = await this.orderRepository.find({
        where: { updatedAt: Between(startDate, endDate) },
        relations: ['orderItems', 'orderItems.product'],
      });

      if (!orderCount.length) throw new Error('Không tìm thấy báo cáo cho khoảng thời gian trên ');
      const skip = (page - 1) * limit;
      const [orders, totalPage] = await this.orderRepository.findAndCount({
        where: { updatedAt: Between(startDate, endDate) },
        relations: ['orderItems', 'orderItems.product'],
        skip,
        take: limit,
      });

      const {  totalOrders, totalProducts, amount_paid } = this.generateUserReport(orderCount);

      return new ApiResponseDto(200 , true , "Tìm báo cáo khoảng thời gian trên thành công " ,{ orders, totalPage, totalOrders, totalProducts, amount_paid})
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  private generateUserReport(orders: Order[]) {
    let totalOrders = 0;
    let totalProducts = 0;
    let amount_paid = 0;
    orders.forEach(order => {
      totalOrders += 1;
      amount_paid += order.amount_paid;
      totalProducts += order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
    });
    return {
      totalOrders,
      totalProducts,
      amount_paid,
    };
  }
}
