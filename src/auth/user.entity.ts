import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt'
import { Task } from "../tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ default: null })
  salt: string

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
