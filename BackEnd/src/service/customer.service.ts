import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Customer , Order } from '@app/entity';
import { ApiResponseDto, CreateCustomerDto, UpdateCustomerDto } from '@app/dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateCustomerDto): Promise<any> {
    try {
      const existingEmail = await this.customerRepository.findOne({ where: { customer_email: data.customer_email } });
      if (existingEmail) {
        throw new Error('Email đã tồn tại');
      }

      const existingPhone = await this.customerRepository.findOne({ where: { customer_phone: data.customer_phone } });
      if (existingPhone) {
        throw new Error('Số điện thoại đã tồn tại');
      }

      const customer = this.customerRepository.create(data);
      await this.customerRepository.save(customer);
      return new ApiResponseDto(200, true , "Tạo tài khoản khách hàng thành công");

    } catch (error) {
        throw new BadRequestException(error);
    }
  }

  async findCustomerByPhone(phoneNumber: string): Promise<any> {
    try {
      const customer = await this.customerRepository.findOneBy({ customer_phone: phoneNumber })
      if (customer) {
        return new ApiResponseDto(200, true, "Tìm kiếm theo khách hàng thành công", customer);
      } else {
        return new ApiResponseDto(404, false, "Không tìm thấy khách hàng với số điện thoại này");
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10, searchTerm: string = ''): Promise<any> {
    const skip = (page - 1) * limit;
    try {
      const queryBuilder = this.customerRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('customer.orders', 'order')
        .take(limit)
        .skip(skip);
      if (searchTerm) {
        queryBuilder.where(
          `customer.customer_name LIKE :searchTerm OR customer.customer_email LIKE :searchTerm OR customer.customer_phone LIKE :searchTerm`,
          { searchTerm: `%${searchTerm}%` }
        );
      }
      const [customers, total] = await queryBuilder.getManyAndCount();

      return {
        data: customers,
        total
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { customer_id: id },
      });
      if (!customer) {
        throw new Error(`Không tìm thấy nhân viên`);
      }
      return new ApiResponseDto(200, true , "Lấy 1 nhân viên thành công" , customer)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, data: UpdateCustomerDto): Promise<any> {
    try {
      let customer = await this.customerRepository.findOneBy({customer_id : id});
      if(!customer){
        throw new Error('Không tìm thấy khách hàng');
      }
      if (data.customer_email) {
        const emailExists = await this.customerRepository.findOne({
          where: {
            customer_email: data.customer_email,
            customer_id: Not(id),
          },
        });
        if (emailExists) {
          throw new Error('Email đã được sử dụng bởi khách hàng khác');
        }
      }
      if (data.customer_phone) {
        const phoneExists = await this.customerRepository.findOne({
          where: {
            customer_phone: data.customer_phone,
            customer_id: Not(id),
          },
        });
        if (phoneExists) {
          throw new Error('Số điện thoại đã được sử dụng bởi khách hàng khác');
        }
      }

      await this.customerRepository.update(id, data);
      return new ApiResponseDto(200, true , "Chỉnh sửa thông tin khách hàng thành công");
    } catch (error) {
      throw new BadRequestException(error);
    }
  }


  async remove(id : string): Promise<void> {
    await this.customerRepository.delete(id);
  }

  async getCustomerOrderHistory(
    customerId: string,
    page: number = 1,
    limit: number = 10,
    searchTerm?: string
  ): Promise<any> {
    try {
      const queryBuilder = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.customer', 'customer')
        .where('order.customer_id = :customerId', { customerId });

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

      return {data, customer: data[0].customer ,total};
    } catch (error) {
      throw new BadRequestException(error || 'Lấy lịch sử đặt hàng thất bại');
    }
  }


}
