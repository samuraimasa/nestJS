import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowdStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('value', value);
    console.log('meta', metadata);

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${ value }" is an invalid status`)
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowdStatuses.indexOf(status)
    return idx !== -1
  }
}
