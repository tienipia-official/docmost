import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {Transform, TransformFnParams} from "class-transformer";

export class CreateGroupDto {
  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsUUID('all', { each: true })
  userIds?: string[];
}

export enum DefaultGroup {
  EVERYONE = '기본그룹',
  DESCRIPTION = '이 워크스페이스의 모든 구성원이 속한 그룹입니다.',
}
