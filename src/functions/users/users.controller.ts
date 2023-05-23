import {
  Body,
  Controller,
  Post,
  UseGuards,
  UnauthorizedException,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { ValidateUserDto } from 'src/validators/User.validate';
import { ValidateRegisterDto } from 'src/validators/Register.validator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import {
  ValidateResetDto,
  ValidateResetPasswordDto,
} from 'src/validators/Reset.validator';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() userDto: ValidateUserDto) {
    const user = await this.authService.validateUser(
      userDto.username,
      userDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) RegisterDto: ValidateRegisterDto) {
    return this.authService.register(RegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getInfo')
  async getInfo(@Request() req) {
    // obtener info del usuario desde el token
    const paylod = this.jwtService.decode(
      req.headers.authorization.split(' ')[1],
    );

    const data = await this.authService.getInformationUser(paylod['user']);
    data['statusCode'] = '200';
    data['message'] = 'Información del usuario';
    return data;
  }

  @Post('sendCode')
  async sendCode(@Body(new ValidationPipe()) ResetDto: ValidateResetDto) {
    return this.authService.sendCode(ResetDto.cedula);
  }

  @Post('resetPassword')
  async resetPassword(
    @Body(new ValidationPipe()) ResetDto: ValidateResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      ResetDto.cedula,
      ResetDto.password,
      ResetDto.code,
    );
  }
}
