import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { UserRepository } from '../auth/user.repository';
import { Skill } from '../auth/skill.entity';
import { UserSkill } from '../auth/user-skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository,
      Todo,
      UserRepository,
      Skill,
      UserSkill,
    ]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TodosService],
})
export class TasksModule {}
