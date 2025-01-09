import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
    id: number;
}
