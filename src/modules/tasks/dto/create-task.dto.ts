import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsISO8601,
  Length,
  IsNumber,
} from 'class-validator';
import { Status } from 'src/config/status.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Status)
  status: Status;

  @IsISO8601({ strict: true })
  @Length(10, 10, { message: 'send date in this formate -> 2024-02-21' })
  startDate: string;

  @IsISO8601({ strict: true })
  @Length(10, 10, { message: 'send date in this formate -> 2024-02-21' })
  endDate: string;

  @IsNumber()
  projectId: number;
}
