import {
  BaseEntity, BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, Generated, IsNull, ManyToOne, Not, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { User } from "../auth/user.entity"
import { HashId } from "../utils/hash_id";
import { Todo } from "./todo.entity";

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number

  @Column()
  encryptedId: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @ManyToOne(() => User, user => user.tasks)
  user: User

  @Column({ default: null })
  userId: number

  @OneToMany(() => Todo, todo => todo.task)
  todos: Todo[]

  @Column()
  hogehoe: string

  @BeforeInsert()
  async generateEncryptedId() {
    while (true) {
      const encryptedId = HashId.gen()
      const task = await Task.findOne({ where: { encryptedId }, withDeleted: true })
      if (!task) {
        this.encryptedId = encryptedId
        return
      }
    }
  }
}
