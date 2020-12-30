/* eslint-disable import/prefer-default-export */
import auth from '../controllers/authController';
import todos from '../controllers/todoController';
import validateAuth from '../middlewares/auth';
import authorize from '../middlewares/authorize';

export const routes = (app) => {
  app.post('/api/auth/signup', validateAuth, auth.signUp);
  app.post('/api/auth/signin', auth.signIn);

  app.post('/api/todos', authorize, todos.create);
  app.get('/api/todos', authorize, todos.fetchAll);
  app.get('/api/todos/:todoId', authorize, todos.fetchOne);
  app.put('/api/todos/:todoId', authorize, todos.update);
  app.delete('/api/todos/:todoId', authorize, todos.delete);
};
