import { Router } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.post('/', (request, response) => {
  try {
    const { email, password, passwordConfirmation } = request.body;

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({ email, password, passwordConfirmation });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();
  return response.json(users);
});

export default usersRouter;
