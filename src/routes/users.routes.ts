import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.post('/', (request, response) => {
  const { email, password, passwordConfirmation } = request.body;

  const findUserWithSameEmail = usersRepository.findByEmail(email);

  if (findUserWithSameEmail) {
    return response.status(400).json({ message: 'Email already used' });
  }

  if (password !== passwordConfirmation) {
    return response.status(400).json({ message: 'The passwords do not match' });
  }

  const user = usersRepository.create(email, password);

  return response.json(user);
});

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();
  return response.json(users);
});

export default usersRouter;
