import models from '../models';

const { Todo } = models;

const todos = {
  async create({ body, decoded }, res, next) {
    try {
      const { title } = body;
      const { userId } = decoded;
      const todo = await Todo.create({ title, userId });
      return res.status(201).send(todo);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async fetchAll({ decoded }, res, next) {
    try {
      const myTodos = await Todo.findAll({ where: { userId: decoded.userId } });
      return res.status(200).send(myTodos);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async fetchOne({ params, decoded }, res, next) {
    try {
      const myTodos = await Todo.findOne({ where: { id: params.todoId, userId: decoded.userId } });
      return res.status(200).send(myTodos);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async update({ body, params, decoded }, res, next) {
    try {
      const foundTodo = await Todo.findOne({
        where: { id: params.todoId, userId: decoded.userId },
      });
      if (!foundTodo) {
        return res.status(404).send({ error: 'Todo not found' });
      }
      const updatedTodo = await Todo.update({ title: body.title || foundTodo.title }, {
        where: { id: foundTodo.id },
        returning: true,
        plain: true,
      });
      return res.status(200).send(updatedTodo[1]);
    } catch (error) {
      return next(new Error(error));
    }
  },
  async delete({ params, decoded }, res, next) {
    try {
      const myTodos = await Todo.findOne({ where: { id: params.todoId, userId: decoded.userId } });
      if (!myTodos) {
        return res.status(404).send({ error: 'Todo not found' });
      }
      await myTodos.destroy();
      return res.status(200).send({ });
    } catch (error) {
      return next(new Error(error));
    }
  },
};

export default todos;
