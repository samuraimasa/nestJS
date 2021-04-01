import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto)
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`Task with ID "${ id }" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
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

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id)
    task.status = status
    await task.save()
    return task
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.softDelete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${ id }" not found`);
    }
  }
}
