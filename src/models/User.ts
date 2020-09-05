import { uuid } from 'uuidv4';

class User {
  id: string;

  userName: string;

  email: string;

  password: string;

  constructor(email: string, password: string) {
    this.id = uuid();
    this.userName = email.slice(0, email.lastIndexOf('@'));
    this.email = email;
    this.password = password;
  }
}

export default User;
