import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { TaskModel } from './task.model';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `User "${user.username}" | ${JSON.stringify(filterDto)}`,
    );
    return this.taskService.getTasks(filterDto, user).then((tasks) =>
      tasks.map((task) => {
        const taskModel = new TaskModel(task);
        return taskModel.convertITask();
      }),
    );
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.taskService.getTaskById(id, user).then((task) => {
      const taskModel = new TaskModel(task);
      return taskModel.convertITask();
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    this.logger.verbose(
      `User "${user.username}" | ${JSON.stringify(createTaskDto)}`,
    );
    return this.taskService.createTask(createTaskDto, user).then((task) => {
      const taskModel = new TaskModel(task);
      return taskModel.convertITask();
    });
  }

  //
  // @Patch('/:id')
  // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): void {
  //   return this.taskService.updateTask(id, updateTaskDto)
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
