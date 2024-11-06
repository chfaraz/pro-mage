import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsISO8601,
  Length,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @IsISO8601({ strict: true })
  @Length(10, 10, { message: 'send date in this formate -> 2024-02-21' })
  startDate: string;

  @IsISO8601({ strict: true })
  @Length(10, 10, { message: 'send date in this formate -> 2024-02-21' })
  endDate: string;
}
