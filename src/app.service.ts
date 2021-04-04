import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('test') private readonly testQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }

  async addQueue() {
    const job = await this.testQueue.add(
      { test: 'test1' },
      { delay: 1000, attempts: 3 },
    );
    return job.id;
  }
}
