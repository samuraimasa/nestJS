import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User
}
