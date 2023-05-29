import { InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';

class db {
  connection: any;

  constructor() {
    // Configura la conexión a la base de datos
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT),
      options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };

    // const config = {
    //   server: process.env.DB_SERVER,
    //   database: process.env.DB_DATABASE,
    //   options: {
    //     encrypt: true,
    //     enableArithAbort: true,
    //     trustServerCertificate: true,
    //     trustedConnection: true, // Agrega esta línea para habilitar Windows Authentication
    //   },
    // };

    // Inicializa la conexión a la base de datos
    this.connection = new sql.ConnectionPool(config);

    // Conecta a la base de datos
    this.connection.connect((err: any) => {
      if (err) throw err;
      console.log('Conexión a la base de datos establecida');
    });
  }

  // Ejecuta un procedimiento almacenado
  async execute(procedure: string, params: any) {
    try {
      const request = new sql.Request(this.connection);

      // Agrega los parámetros al procedimiento almacenado
      params.forEach((param: any) => {
        request.input(param.name, param.type, param.value);
      });

      const result = await request.execute(procedure);
      return result.recordset;
    } catch (error) {
      console.log('execute', error);
      throw new InternalServerErrorException(error);
    }
  }

  // Cierra la conexión a la base de datos
  disconnect() {
    this.connection.close((err: any) => {
      if (err) throw err;
      console.log('Conexión a la base de datos cerrada');
    });
  }
}

export { db };
