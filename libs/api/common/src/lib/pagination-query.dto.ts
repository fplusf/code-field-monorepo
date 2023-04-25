import { IsEnum, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'], { message: 'order must be ASC or DESC' })
  order: string;

  @IsOptional()
  @IsEnum(['lastViewedAt', 'createdAt', 'updatedAt'])
  sortBy: string;
}
