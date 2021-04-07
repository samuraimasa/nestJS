import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { UserRepository } from '../auth/user.repository';
import { Skill } from '../auth/skill.entity';
import { Task, TaskStatus } from './task.entity';
import { UserSkill } from '../auth/user-skill.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { isNullOrUndefined } from 'util';

@Injectable()
export class TodosService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>,
  ) {}

  async batchTest() {
    this.logger.debug(`------- start ------->> ${uuid()}`);

    // const query = this.userRepository.createQueryBuilder('user');
    // query.andWhere('data@>\'{"b": "hoge佐野"}\'');
    // const _r = await query.execute();
    // console.log(_r);
    //
    // let _skill1 = new Skill();
    // _skill1.name = 'TypeORM';
    // await _skill1.save();
    // let _skill2 = new Skill();
    // _skill2.name = 'TypeORM2';
    // await _skill2.save();
    // const skills = [_skill1, _skill2];
    //
    // const user0 = await this.userRepository.signUp(<AuthCredentialsDto>{
    //   username: 'User123',
    //   password: 'SAdiout1873',
    // });
    // user0.skills = skills;
    // await user0.save();
    //
    // let tt = new Task();
    // tt.title = 'title';
    // tt.description = 'desc';
    // tt.status = TaskStatus.DONE;
    // await tt.save();
    // user0.tasks = [tt];
    // await user0.save();
    //
    // let td = new Todo();
    // td.title = 'title';
    // td.description = 'desc';
    // td.task = tt;
    // td.user = user0;
    // td.type = 1111;
    // await td.save();
    // let td2 = new Todo();
    // td2.title = 'title';
    // td2.description = 'desc';
    // td2.task = tt;
    // td2.user = user0;
    // td2.type = 2222;
    // await td2.save();
    //
    // const us = await this.userSkillRepository.findOne({
    //   userId: 1,
    //   skillId: 1,
    // });
    // us.hogehoge = 'テストほげ1';
    // await us.save();
    // console.log(us);
    //
    // //
    // const task = await this.taskRepository.findOne(1);
    // console.log(task);
    //
    // const todo = await this.todoRepository.find({ taskId: task.id });
    // console.log(todo);
    //
    // const users = await this.userRepository.find({ id: task.userId });
    // console.log(users);
    //
    // // TODO: relations 取得
    // const username = 'User123';
    // const user = await this.userRepository.findOne({
    //   where: { username },
    //   relations: ['tasks', 'skills'],
    // });
    // console.log(user);
    //
    // // TODO: 孫まで取得 [user -> task -> todo]
    // const _user = await this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.tasks', 'task')
    //   .leftJoinAndSelect('task.todos', 'todo')
    //   .where('user.id = :id', { id: user.id })
    //   .withDeleted()
    //   .getMany();
    // const _tasks = _user.map((user) => user.tasks);
    // const __tasks = <Task[]>[].concat(..._tasks);
    // console.log(__tasks);
    // const _todos = __tasks.map((user) => user.todos);
    // const __todos = <Todo[]>[].concat(..._todos);
    // console.log(__todos);
    //
    // const skill = await this.skillRepository.find({
    //   where: { name: 'test' },
    //   relations: ['users'],
    // });
    // console.log(skill);
  }
}
