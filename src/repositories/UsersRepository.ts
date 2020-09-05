import User from '../models/User';

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public findByEmail(email: string): User | null {
    const findUserWithSameEmail = this.users.find(user => user.email === email);

    return findUserWithSameEmail || null;
  }

  public create(email: string, password: string): User {
    const user = new User(email, password);

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
