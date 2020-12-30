import models from '../models';
import { comparePassword, hashPassword, jwtToken } from '../utils';

const { User } = models;

const auth = {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({ name, email, password: hash });
      const token = jwtToken.createToken(user);
      const { id } = user;
      return res.status(201).send({ token, user: { name, email, id } });
    } catch (error) {
      return next(new Error(error));
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && comparePassword(password, user.password)) {
        const { id, name } = user;
        const token = jwtToken.createToken(user);
        return res.status(200).send({ token, user: { id, name, email } });
      }
      return res.status(400).send({ error: 'invalid email or password' });
    } catch (error) {
      return next(new Error(error));
    }
  },

};

export default auth;
