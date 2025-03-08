import { BadRequestException, Injectable , OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer, Role, User } from '@app/entity';
import { HashService } from '@app/util';
import { ProductService } from '@app/service/product.service';

@Injectable()
export class DefaultService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly productService: ProductService,
  ) {}

  async createDefaultData() {
    try {
      let adminRole = await this.roleRepository.findOne({
        where: { role_name: 'ADMIN' },
      });
      let userRole = await this.roleRepository.findOne({
        where: { role_name: 'USER' },
      });

      if (!adminRole) {
        adminRole = this.roleRepository.create({ role_name: 'ADMIN' });
        await this.roleRepository.save(adminRole);
      }
      if (!userRole) {
        userRole = this.roleRepository.create({
          role_name: 'USER',
          role_description: 'Nhân viên bán hàng',
        });
        await this.roleRepository.save(userRole);
      }

      const hashedPassword = await this.hashService.hashData('12345678');
      let adminUser = await this.userRepository.findOne({
        where: { username: 'admin' },
      });
      if (!adminUser) {
        adminUser = this.userRepository.create({
          fullName: 'thầy Hồng đẹp trai',
          username: 'admin',
          dateOfBirth: new Date('17-08-2024'),
          email: 'testadmin@gmail.com',
          password: hashedPassword,
          isHasPassword: true,
          background: 'background/bg.jpg',
          role: adminRole,
        });
        await this.userRepository.save(adminUser);
      }

      let regularUser = await this.userRepository.findOne({
        where: { username: 'user' },
      });
      if (!regularUser) {
        regularUser = this.userRepository.create({
          username: 'user',
          fullName: 'Nguyễn Văn A',
          dateOfBirth: new Date('17-08-2024'),
          email: 'user@gmail.com',
          password: hashedPassword,
          isHasPassword: true,
          background: 'background/bg.jpg',
          role: userRole,
        });
        await this.userRepository.save(regularUser);

        let customer = await this.customerRepository.findOne({
          where: { customer_email: 'test@gmail.com' },
        });
        if (!customer) {
          customer = await this.customerRepository.create({
            customer_id: '1',
            customer_name: 'Nguyen Thi Lan',
            customer_email: 'nguyenlan@example.com',
            customer_phone: '0903456789',
            customer_address: '123 Mai Anh Tuấn, Quận 1, TP.HCM',
            membership_level: 'VIP',
            points_balance: 150,
            last_purchase_date: '2024-11-01',
            total_spent: 2000000,
          });
          await this.customerRepository.save(customer);
        }
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async onModuleInit() {
    const filePath = 'public/data/iphone.json';
    const fs = require('fs');
    const path = require('path');

    // Đọc và xử lý file JSON khi ứng dụng bắt đầu
    fs.readFile(path.join(process.cwd(),filePath), 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }

      try {
        const products = JSON.parse(data);
        const savedProducts = [];
        for (const productData of products) {
          const savedProduct = await this.productService.saveProductData(productData);
          savedProducts.push(savedProduct);
        }
        await this.createDefaultData();
        console.log('Tạo dữ liệu lần dầu cập nhật thành công.');
      } catch (error) {
        console.error('Error processing JSON data:', error);
      }
    });
  }
}
