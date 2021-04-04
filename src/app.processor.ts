import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { GoneException } from '@nestjs/common';

@Processor('test')
export class AppProcessor {
  @Process({ concurrency: 2 })
  async transcode(job: Job<unknown>) {
    console.log(job.data, 'trans');
    console.log(await job.isFailed());
    console.log(await job.isCompleted());
    if (job.attemptsMade == 1) {
      return;
    }
    throw new GoneException();
  }

  // @OnQueueFailed()
  // async handler(job: Job, err: Error) {
  //   console.log(job.data, 'failded');
  //   console.log(await job.isFailed());
  //   // await job.finished();
  // }
}
