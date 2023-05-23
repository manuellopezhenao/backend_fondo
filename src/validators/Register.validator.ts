import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ValidateRegisterDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  cedula: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  email: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date_birth: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Type(() => String)
  @IsString()
  last_name: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  first_last_name: string;

  @Type(() => String)
  @IsString()
  second_last_name: string;
}
