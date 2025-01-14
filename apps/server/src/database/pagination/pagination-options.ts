import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PaginationOptions {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(99999)
  limit = 20;

  @IsOptional()
  @IsString()
  query: string;
}
