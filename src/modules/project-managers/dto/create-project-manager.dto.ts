import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProjectManagerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;
}
