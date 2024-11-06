import { IsNumber, IsOptional, IsString } from 'class-validator';
export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  @IsString()
  orderBy?: string = 'updatedAt';

  @IsOptional()
  @IsString()
  order?: OrderType = OrderType.DESC;
}
