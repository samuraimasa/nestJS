import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.createApplicationContext(AppModule);
  // PROC=abcde nest start -c nest-cli-standalone.json
  console.log(process.env.PROC);
  // application logic...

  const configService = app.get(ConfigService);
  const port = configService.get('server').port || 9999;
  logger.debug(port);
  const taskService = app.get(TasksService);
  await taskService.batchTest();
  console.log('batch');
  await app.close();
}

bootstrap();
