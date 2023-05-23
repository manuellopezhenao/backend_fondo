import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { ValidateRegisterDto } from 'src/validators/Register.validator';
import { IRecordSet } from 'mssql';
import { DataBaseService } from 'src/database/database.service';
import { compareData, encryptData } from 'utils/encryp_data';

@Injectable()
export class UsersService {
  constructor(private database: DataBaseService) {}

  async findOneUser(username: string): Promise<IRecordSet<any>> {
    const user = await this.database.db.execute('CheckUser', [
      { name: 'username', type: sql.NVarChar, value: username },
    ]);

    return user;
  }

  async registerUser(user: ValidateRegisterDto): Promise<IRecordSet<any>> {
    const partesFecha = user.date_birth.split('/');
    const fechaNueva = new Date(
      Number(partesFecha[2]),
      Number(partesFecha[1]) - 1,
      Number(partesFecha[0]),
    );
    const fechaISO = fechaNueva.toISOString().slice(0, 10);

    const fullname = `${user.first_name} ${user.last_name} ${user.first_last_name} ${user.second_last_name}`;
    const fullnamesinEspacios = fullname
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();

    console.log({ fullnamesinEspacios });

    const newUser = await this.database.db.execute('SaveUser', [
      { name: 'cedula', type: sql.NVarChar, value: user.cedula },
      { name: 'name', type: sql.NVarChar, value: user.name },
      { name: 'email', type: sql.NVarChar, value: user.email },
      {
        name: 'password',
        type: sql.NVarChar,
        value: await encryptData(user.password),
      },
      { name: 'date_birth', type: sql.DateTime, value: fechaISO },
      { name: 'order_name', type: sql.NVarChar, value: fullnamesinEspacios },
    ]);

    return newUser;
  }

  async getIfo(cedula: number): Promise<any> {
    const usuario = await this.database.db.execute('GetInfoUser', [
      { name: 'id_user', type: sql.Int, value: cedula },
    ]);

    const ahorros = await this.database.db.execute('GetAhorros', [
      { name: 'id_user', type: sql.Int, value: cedula },
    ]);

    const creditos = await this.database.db.execute('GetCreditos', [
      { name: 'id_user', type: sql.Int, value: cedula },
    ]);

    const novedades = await this.database.db.execute('GetNovedades', [
      { name: 'id_user', type: sql.Int, value: cedula },
    ]);

    const novedadesFiltradas = novedades.filter((novedad: any) => {
      if (
        novedad.Nombre != 'CONVENIOS POR PAGAR-COOPSERPARK' &&
        novedad.Productos != 'TOTAL' &&
        novedad.Nombre != 'INTERESES CTES CREDITOS DE CONSUMO'
      ) {
        return novedad;
      }
    });

    console.log({ usuario });

    return {
      usuario: usuario[0],
      ahorros,
      creditos,
      novedades: novedadesFiltradas,
    };
  }

  async getEmail(cedula: string): Promise<IRecordSet<any>> {
    const user = await this.database.db.execute('GetEmailUser', [
      { name: 'cedula', type: sql.NVarChar, value: cedula },
    ]);

    return user;
  }

  async saveCode(cedula: string, code: string): Promise<IRecordSet<any>> {
    const fecha = `
    ${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    console.log({ fecha });

    const user = await this.database.db.execute('SavePin', [
      { name: 'cedula', type: sql.NVarChar, value: cedula },
      { name: 'pin', type: sql.NVarChar, value: code },
      { name: 'expires', type: sql.DateTime, value: fecha },
    ]);

    return user;
  }

  async resetPassword(
    cedula: string,
    password: string,
    code: string,
  ): Promise<IRecordSet<any>> {
    const fecha = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    const user = await this.database.db.execute('ResetPassword', [
      { name: 'cedula', type: sql.NVarChar, value: cedula },
      {
        name: 'password',
        type: sql.NVarChar,
        value: await encryptData(password),
      },
      { name: 'code', type: sql.NVarChar, value: code },
      { name: 'date', type: sql.DateTime, value: fecha },
    ]);
    console.log({ cedula, password, code, fecha });
    return user;
  }
}
