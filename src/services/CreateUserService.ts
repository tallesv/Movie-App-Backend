import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
  passwordConfirmation: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ email, password, passwordConfirmation }: Request): User {
    const findUserWithSameEmail = this.usersRepository.findByEmail(email);

    if (findUserWithSameEmail) {
      throw Error('This email already exists');
    }

    if (password !== passwordConfirmation) {
      throw Error('The passwords do not match');
    }

    const user = this.usersRepository.create({ email, password });

    return user;
  }
}

export default CreateUserService;
