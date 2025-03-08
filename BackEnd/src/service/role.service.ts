import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role , User } from '@app/entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { role_id: id }, relations: ['users'] });
  }

  async update(id: number, data: Partial<Role>): Promise<Role> {
    await this.roleRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
  async deleteRoleById(id: number): Promise<string> {
    const role = await this.roleRepository.findOneBy({ role_id: id });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (role.isDeleted) {
      return 'Role has already been deleted';
    }

    role.isDeleted = true;
    await this.roleRepository.save(role);

    return 'Role marked as deleted';
  }

}
