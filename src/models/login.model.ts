export class Login {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  static fromJson(json: any): Login {
    const login = new Login(json.username, json.password);
    return login;
  }

  public static fromJsonArray(json: any[]): Login[] {
    return json.map(Login.fromJson);
  }
}
