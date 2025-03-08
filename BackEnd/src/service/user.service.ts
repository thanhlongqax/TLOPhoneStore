import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { User, Role } from '@app/entity';
import { ApiResponseDto, CreateEmployeeDto, CreateUserDto, UpdateAdminDto, UpdateUserDto , EmployeeDto } from '@app/dto';
import { HashService } from '@app/util';
import * as jwt from 'jsonwebtoken';
import * as process from 'node:process';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly hashService: HashService,
    private readonly mailerService : MailerService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const userRole = await this.roleRepository.findOne({ where: { role_name: 'USER' } });
    if (!userRole) {
      const newRole = this.roleRepository.create({ role_name: 'USER' });
      await this.roleRepository.save(newRole);
    }
    const hashedPassword = await this.hashService.hashData(createUserDto.password);
    createUserDto.password = hashedPassword
    const user = this.userRepository.create({
      ...createUserDto,
      role: userRole,
    });

    return await this.userRepository.save(user);
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<any> {
    let dateOfBirth;
    if(createEmployeeDto.dateOfBirth){
      dateOfBirth = new Date(createEmployeeDto.dateOfBirth);
      if (isNaN(dateOfBirth.getTime())) {
        throw new Error('Invalid dateOfBirth format');
      }
    }

    const userRole = await this.roleRepository.findOne({ where: { role_name: 'USER' } });
    if (!userRole) {
      const newRole = this.roleRepository.create({ role_name: 'USER' });
      await this.roleRepository.save(newRole);
    }
    const username = createEmployeeDto.email.split('@')[0];
    const user = this.userRepository.create({
      fullName : createEmployeeDto.fullName,
      dateOfBirth: dateOfBirth,
      background : createEmployeeDto.background,
      email : createEmployeeDto.email,
      confirmationToken : createEmployeeDto.confirmationToken,
      username: username,
      role: userRole,
    });

    return await this.userRepository.save(user);
  }

  // async getAllUsers(): Promise<any[]> {
  //   return await this.userRepository.query(
  //     'SELECT * FROM user INNER JOIN role ON user.role_id = role.role_id',
  //   );
  // }

  async findUserById(id: string): Promise<any | null> {
    const user = await this.userRepository.findOneBy({user_id : id})
    return user || null;
  }

  async findUserByUsername(username: string): Promise<any | null> {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: ['role'],
    });
  }

  async getEmployeeByUserName(username : string ):Promise<any>{
    let user = await this.findUserByUsername(username);
    if (!user) {
      throw new Error("không tìm thấy nhân viên")
    }
    let employeeDTO = new EmployeeDto();
    employeeDTO.user_id = user.user_id;
    employeeDTO.username = user.username;
    employeeDTO.fullName = user.fullName;
    employeeDTO.email = user.email;
    employeeDTO.background = user.background;
    employeeDTO.dateOfBirth = user.dateOfBirth;
    employeeDTO.role_description = user.role.role_description;

    return new ApiResponseDto(200, true , "Lấy 1 nhân viên thành công " , employeeDTO);
  }

  async findByEmail(email: string): Promise<any | null> {
    let user = await this.userRepository.findOne({
      where: { email },
      relations: ['role']
    });
    return user;
  }

  async updateAdminByUserName(username: string, updateAdminDto: UpdateAdminDto): Promise<any | null> {
    try {
      const admin = await this.roleRepository.findOne({where : {role_name: 'ADMIN'}});

      if(!admin) {
        let newAdmin = this.roleRepository.create({
          role_name: 'ADMIN',
          role_description : 'người quản trị'
        })
        await this.roleRepository.save(newAdmin);
      }

      let user = await this.userRepository.findOne({
        where: { username: username },
        relations: ['role'],
      });
      if (!user) {
        throw new Error('Admin không tồn tại.');
      }
      if (updateAdminDto.password) {
        updateAdminDto.password = await this.hashService.hashData(updateAdminDto.password);
      }
      const updateFields = Object.keys(updateAdminDto)
        .filter((key) => updateAdminDto[key] !== undefined)
        .map((key) => `${key} = ?`)
        .join(', ');
      const updateValues = Object.values(updateAdminDto).filter((value) => value !== undefined);
      await this.userRepository.query(
        `UPDATE user SET ${updateFields} WHERE username = ?`,
        [...updateValues, username],
      );
      return new ApiResponseDto(200, true , "Cập nhật thành công")
    }catch (error){
      throw new NotFoundException(error)
    }
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<any | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id },
        relations: ['role'],
      });

      if (!user) {
        throw new Error('Tài khoản không tồn tại.');
      }

      const fieldsToUpdate = Object.entries(updateUserDto).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as Partial<UpdateUserDto>,
      );
      if(fieldsToUpdate.password){
        fieldsToUpdate.password = await this.hashService.hashData(updateUserDto.password);
      }

      if (Object.keys(fieldsToUpdate).length === 0) {
        throw new Error('Không có dữ liệu để cập nhật.');
      }
      await this.userRepository.update({ user_id: id }, fieldsToUpdate);

      return new ApiResponseDto(200, true, 'Cập nhật thành công');
    } catch (error) {
      throw new NotFoundException(error.message || 'Lỗi cập nhật');
    }
  }

  async updateUserByUserId(id: string, updateUserDto: UpdateUserDto): Promise<any | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id },
        relations: ['role'],
      });

      if (!user) {
        throw new Error('Tài khoản không tồn tại.');
      }

      const fieldsToUpdate = Object.entries(updateUserDto).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as Partial<UpdateUserDto>,
      );
      if (Object.keys(fieldsToUpdate).length === 0) {
        throw new Error('Không có dữ liệu để cập nhật.');
      }
      await this.userRepository.update({ user_id: id }, fieldsToUpdate);

      return new ApiResponseDto(200, true, 'Cập nhật thành công');
    } catch (error) {
      throw new NotFoundException(error.message || 'Lỗi cập nhật');
    }
  }

  async deleteUserById(id: string): Promise<void> {
    await this.userRepository.query(
      'DELETE FROM user WHERE user_id = ?',
      [id],
    );
  }

  async getAllEmployee(page: number = 1, limit: number = 10, search: string = ''): Promise<any> {
    const offset = (page - 1) * limit;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .where('role.role_name = :roleName', { roleName: 'USER' })
      .skip(offset)
      .take(limit);

    if (search) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('user.username LIKE :search', { search: `%${search}%` })
            .orWhere('user.fullName LIKE :search', { search: `%${search}%` })
            .orWhere('user.email LIKE :search', { search: `%${search}%` });
        })
      );
    }
    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

  async findEmployeeById(id: string): Promise<any> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.role', 'role')
        .where('user.user_id = :id', { id })
        .andWhere('role.role_name = :roleName', { roleName: 'USER' })
        .getOne();
      if (!user) {
        throw new Error('Không tìm thấy nhân viên cần tìm');
      }
      return new ApiResponseDto(200 , true , "lấy 1 nhân viên thành công " , user)
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async LockEmployeeById(id: string): Promise<any> {
    try {
      let userRole = await this.roleRepository.findOne({ where: { role_name: 'USER' } });
      if (!userRole) {
        userRole = this.roleRepository.create({ role_name: 'USER' });
        await this.roleRepository.save(userRole);
      }

      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.role', 'role')
        .where('user.user_id = :id', { id })
        .andWhere('role.role_name = :roleName', { roleName: 'USER' })
        .getOne();

      if (!user) {
        throw new Error('Không tìm thấy nhân viên ');
      }

      user.isHasLocked = true;
      await this.userRepository.update(id, user);

      return new ApiResponseDto(200, true, 'Đã khóa thành công');
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async UnLockEmployeeById(id: string): Promise<any> {
    try {
      let userRole = await this.roleRepository.findOne({ where: { role_name: 'USER' } });
      if (!userRole) {
        userRole = this.roleRepository.create({ role_name: 'USER' });
        await this.roleRepository.save(userRole);
      }

      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.role', 'role')
        .where('user.user_id = :id', { id })
        .andWhere('role.role_name = :roleName', { roleName: 'USER' })
        .getOne();

      if (!user) {
        throw new Error('Không tìm thấy nhân viên ');
      }

      user.isHasLocked = false;
      await this.userRepository.update(id, user);

      return new ApiResponseDto(200, true, 'Đã mở khóa thành công');
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async sendWithGmail(userId: string): Promise<any> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.role', 'role')
        .where('user.user_id = :id', { id: userId })
        .andWhere('role.role_name = :roleName', { roleName: 'USER' })
        .getOne();
      if (!user) {
        throw new Error('Không tìm thấy nhân viên. Vui lòng tạo tài khoản');
      }
      if (!user.email) {
        throw new Error('Email bị trống');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        throw new Error('Vui lòng nhập email hợp lệ');
      }
      const token = jwt.sign({ email: user.email }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h',
      });
      user.confirmationToken = token;
      await this.userRepository.save(user);
      await this.sendUserConfirmation(user.email, token);
      return new ApiResponseDto(200 , true , "Đã gửi email reset mật khẩu");
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async sendUserConfirmation(userEmail: string, token: string) {
    const url = `${process.env.CLIENT_URL}/login?token=${token}`;
    const url_password= `${process.env.CLIENT_URL}/changpassword?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: 'Xác thực Email của bạn',
        template: 'confirmation',
        context: { url  , url_password},
      });
    }catch (error ){
      throw new BadRequestException('Email không đúng hoặc không tồn tại');
    }
  }
}
