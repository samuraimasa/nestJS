import { Task, TaskStatus } from "./task.entity";

export type ITask = {
  id: string
  title: string
  description: string
  status: TaskStatus.OPEN | TaskStatus.IN_PROGRESS | TaskStatus.DONE
  createdAt: Date
  updatedAt: Date
}

export class TaskModel {
  constructor(
    private task: Task
  ) {
  }

  convertITask(): ITask {
    return {
      id: this.task.encryptedId,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      createdAt: this.task.createdAt,
      updatedAt: this.task.updatedAt,
    }
  }
}
