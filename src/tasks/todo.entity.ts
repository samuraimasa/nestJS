import {
  BaseEntity,
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Task } from "./task.entity"
import { User } from "../auth/user.entity";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => Task, task => task.todos)
  task: Task

  @Column({ default: null })
  taskId: number
}
