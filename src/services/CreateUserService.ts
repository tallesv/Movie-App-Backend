import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const findUserWithSameEmail = await usersRepository.findOne({
      where: { email },
    });

    if (findUserWithSameEmail) {
      throw Error('This email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.createUser({
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
