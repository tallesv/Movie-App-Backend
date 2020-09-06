import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

interface CreateUserDTO {
  userName: string;
  email: string;
  password: string;
}
@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | null> {
    const findUserWithSameEmail = await this.findOne({
      where: { email },
    });

    return findUserWithSameEmail || null;
  }

  public async createUser({
    email,
    password,
  }: Omit<CreateUserDTO, 'userName'>): Promise<User> {
    const user = await this.create({
      userName: email.slice(0, email.lastIndexOf('@')),
      email,
      password,
    });

    await this.save(user);

    return user;
  }
}

export default UsersRepository;
