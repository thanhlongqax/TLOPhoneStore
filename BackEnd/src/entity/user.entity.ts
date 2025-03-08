import { Entity, Column, PrimaryGeneratedColumn, ManyToOne ,JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column({ length: 255 ,nullable: true , unique: true })
  username: string;

  @Column({ length: 255  ,nullable: true})
  password: string;

  @Column({nullable: true, length: 255 })
  fullName: string;

  @Column({nullable: true})
  dateOfBirth: Date;

  @Column({ length: 255 })
  email: string;

  @Column({ nullable: true, length: 255 })
  refreshToken: string | null;

  @Column({ default : false})
  isHasPassword: boolean ;

  @Column({ default : false})
  isHasLocked: boolean ;

  @Column({nullable:true})
  background: string ;

  @Column({ nullable: true })
  confirmationToken: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
    