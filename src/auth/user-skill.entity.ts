import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';
import { Skill } from './skill.entity';

@Entity({ name: 'user_skills', synchronize: false })
export class UserSkill extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userSkill)
  user: User;

  @PrimaryColumn({ type: 'bigint' })
  userId: number;

  @ManyToOne(() => Skill, (skill) => skill.userSkill)
  skill: Skill;

  @PrimaryColumn({ type: 'bigint' })
  skillId: number;

  @Column({ default: null })
  hogehoge: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
