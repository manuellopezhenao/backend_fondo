import { IsString, Length } from 'class-validator';

export class ValidateResetDto {
  @IsString()
  @Length(3, 30)
  cedula: string;
}

export class ValidateResetPasswordDto {
  @IsString()
  @Length(3, 30)
  cedula: string;

  @IsString()
  @Length(3, 30)
  password: string;

  @IsString()
  @Length(3, 30)
  code: string;
}
