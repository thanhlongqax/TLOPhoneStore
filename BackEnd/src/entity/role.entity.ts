  import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ length: 255 })
  role_name: string;

  @Column({ nullable : true,length: 255 })
  role_description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
