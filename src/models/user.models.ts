export class User {
  cedula: string;
  name: string;
  username: string;
  password: string;
  email: string;
  id_user: number;
  token?: string;
  date_birth?: string;
  created_at: Date;

  constructor(
    id_user: number,
    cedula: string,
    name: string,
    email: string,
    username: string,
    password: string,
    created_at: Date,
  ) {
    this.id_user = id_user;
    this.cedula = cedula;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.created_at = created_at;
  }

  static fromJson(json: any): User {
    const login = new User(
      json.id_user,
      json.cedula,
      json.name,
      json.email,
      json.username,
      json.password,
      json.created_at,
    );
    return login;
  }

  public static fromJsonArray(json: any[]): User[] {
    return json.map(User.fromJson);
  }
}
