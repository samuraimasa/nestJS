import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import env from './env';
import config from './config/confg';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { AppProcessor } from './app.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env, config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    BullModule.registerQueue({
      name: 'test',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppProcessor],
})
export class AppModule {}
