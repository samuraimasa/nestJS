import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from "./task.model";
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto
    let tasks = this.getAllTasks()
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search)
      );
    }
    return tasks
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${ id }" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): void {
    let task = this.getTaskById(id)
    if (!task) return

    const { title, description, status } = updateTaskDto
    if (title) {
      task.title = title
    }
    if (description) {
      task.description = description
    }
    if (status) {
      task.status = status
    }
    this.deleteTask(id)
    this.tasks.push(task);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    let task = this.getTaskById(id)
    return task
  }

  deleteTask(id: string) {
    const found = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
