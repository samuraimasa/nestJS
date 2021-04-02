import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user?: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  //
  // updateTask(id: string, updateTaskDto: UpdateTaskDto): void {
  //   let task = this.getTaskById(id)
  //   if (!task) return
  //
  //   const { title, description, status } = updateTaskDto
  //   if (title) {
  //     task.title = title
  //   }
  //   if (description) {
  //     task.description = description
  //   }
  //   if (status) {
  //     task.status = status
  //   }
  //   this.deleteTask(id)
  //   this.tasks.push(task);
  // }
  //

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.softDelete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async batchTest() {
    const task = await this.taskRepository.findOne(1);
    console.log(task);
  }
}
