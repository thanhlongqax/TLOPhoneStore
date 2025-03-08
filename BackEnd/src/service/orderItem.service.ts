import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem , Order } from '@app/entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(data);
    return this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({ relations: ['order'] });
  }

  async findOne(id: number): Promise<OrderItem> {
    return this.orderItemRepository.findOne({ where: { order_item_id: id }, relations: ['order'] });
  }

  async update(id: number, data: Partial<OrderItem>): Promise<OrderItem> {
    await this.orderItemRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderItemRepository.delete(id);
  }

  async findOrderByOrderItem(id: number): Promise<Order> {
    const orderItem = await this.findOne(id);
    return orderItem.order;
  }
}
