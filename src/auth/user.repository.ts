import { EntityRepository, Repository } from "typeorm"
import { User } from "./user.entity"
import { AuthCredentialsDto } from "./dto/auth-credentials.dto"
import { ConflictException, InternalServerErrorException } from "@nestjs/common"
import * as bcrypt from 'bcrypt'
import { Task } from "../tasks/task.entity";
import { Todo } from "../tasks/todo.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await UserRepository.hashPassword(password, user.salt)

    try {
      await user.save()
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto
    const user = await this.findOne({ username })
    // TODO: relations 取得
    // const user = await this.findOne({ where: { username }, relations: ["tasks"] })

    // TODO: 孫まで取得 [user -> task -> todo]
    // const _user = await this.createQueryBuilder('user')
    //   .innerJoinAndSelect("user.tasks", "task")
    //   .innerJoinAndSelect("task.todos", "todo")
    //   .where('user.id = :id', { id: 1 })
    //   .withDeleted()
    //   .getOne()
    // console.log(_user)

    if (user && await user.validatePassword(password)) {
      return user.username
    } else {
      return null
    }
  }

  private static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
