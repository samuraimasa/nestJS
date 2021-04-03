import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { HashId } from '../utils/hash_id';
import { User } from './user.entity';
import { UserSkill } from './user-skill.entity';

@Entity()
@Unique(['name'])
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null, unique: true })
  encryptedId: string;

  @Column()
  name: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.skill)
  userSkill: UserSkill[];

  @ManyToMany(() => User, (user) => user.skills)
  users: User[];

  @BeforeInsert()
  async generateEncryptedId() {
    while (true) {
      const encryptedId = HashId.gen();
      const skill = await Skill.findOne({
        where: { encryptedId },
        withDeleted: true,
      });
      if (!skill) {
        this.encryptedId = encryptedId;
        return;
      }
    }
  }
}
