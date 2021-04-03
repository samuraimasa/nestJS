import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
import { HashId } from '../utils/hash_id';
import { Skill } from './skill.entity';
import { UserSkill } from './user-skill.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null, unique: true })
  encryptedId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: null })
  salt: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkill: UserSkill[];

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable({
    name: 'user_skills',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skillId',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];

  @BeforeInsert()
  async generateEncryptedId() {
    while (true) {
      const encryptedId = HashId.gen();
      const user = await User.findOne({
        where: { encryptedId },
        withDeleted: true,
      });
      if (!user) {
        this.encryptedId = encryptedId;
        return;
      }
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

// @Entity('user_skills')
// export class UserSKill {
//   @PrimaryColumn({ type: 'bigint' })
//   userId: number;
//
//   @ManyToOne(() => User, (user) => user.skills)
//   @JoinColumn({ name: 'userId' })
//   user: User;
//
//   @PrimaryColumn({ type: 'bigint' })
//   skillId: number;
//
//   @ManyToOne(() => Skill, (skill) => skill.users)
//   @JoinColumn({ name: 'skillId' })
//   skill: Skill;
//
//   @CreateDateColumn()
//   readonly createdAt?: Date;
//
//   @UpdateDateColumn()
//   readonly updatedAt?: Date;
// }
