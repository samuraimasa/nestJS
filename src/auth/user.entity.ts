import {
  BaseEntity, BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from "typeorm"
import * as bcrypt from 'bcrypt'
import { Task } from "../tasks/task.entity"
import { HashId } from '../utils/hash_id'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number

  @Column({ default: null, unique: true })
  encryptedId: string

  @Column()
  username: string

  @Column()
  password: string

  @Column({ default: null })
  salt: string

  @CreateDateColumn()
  readonly createdAt?: Date

  @UpdateDateColumn()
  readonly updatedAt?: Date

  @DeleteDateColumn()
  readonly deletedAt?: Date

  @OneToMany(() => Task, task => task.user)
  tasks: Task[]

  @BeforeInsert()
  async generateEncryptedId() {
    while (true) {
      const encryptedId = HashId.gen()
      const user = await User.findOne({ where: { encryptedId }, withDeleted: true })
      if (!user) {
        this.encryptedId = encryptedId
        return
      }
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
