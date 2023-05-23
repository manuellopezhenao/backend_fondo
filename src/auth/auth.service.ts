import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../functions/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.models';
import { ValidateRegisterDto } from 'src/validators/Register.validator';
import { PasswordResetService } from './generate-code.service';
import { sendEmail } from 'utils/send_email';
import { compareData } from 'utils/encryp_data';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private password: PasswordResetService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userDB = await this.usersService.findOneUser(username);
    const user = new User(
      userDB[0].id_user,
      userDB[0].cedula,
      userDB[0].name,
      userDB[0].email,
      userDB[0].username,
      userDB[0].password,
      userDB[0].created_at,
    );

    if (userDB[0]['error']?.includes('Usuario No Existe')) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'El usuario no existe',
      });
    }

    if (!(await compareData(pass, userDB[0].password))) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'La contraseña es incorrecta',
      });
    }

    if (user.id_user) {
      return user;
    }
    return null;
  }

  async login(id_user: User) {
    const payload = {
      user: id_user.id_user,
      created_at: Date.now(),
    };
    return {
      access_token: this.jwtService.sign(payload),
      statusCode: '200',
      message: 'Login success',
    };
  }

  async register(user: ValidateRegisterDto) {
    const newUser = await this.usersService.registerUser(user);

    return {
      statusCode: newUser[0]['error'] ? '400' : '200',
      message: newUser[0]['error'] ? newUser[0]['error'] : 'Register success',
    };
  }

  async getInformationUser(id_user: number) {
    return await this.usersService.getIfo(id_user);
  }

  async sendCode(cedula: string) {
    const userDB = await this.usersService.getEmail(cedula);
    const code = await this.password.generatecode();
    if (userDB[0].email) {
      console.log(userDB[0]);
      userDB[0].name = userDB[0].name.split(' ');
      await sendEmail(userDB[0].email, code, userDB[0].name);
      await this.usersService.saveCode(cedula, code);
      return {
        statusCode: '200',
        message: 'codigo enviado',
      };
    } else {
      return {
        statusCode: '500',
        message: 'Usuario No Existe',
      };
    }
  }

  async resetPassword(cedula: string, password: string, code: string) {
    const userDB = await this.usersService.resetPassword(
      cedula,
      password,
      code,
    );
    if (userDB[0]['error']) {
      return {
        statusCode: '400',
        message: userDB[0]['error'],
      };
    } else {
      return {
        statusCode: '200',
        message: 'contraseña actualizada',
      };
    }
  }
}
