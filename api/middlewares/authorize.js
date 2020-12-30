/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import models from '../models';

const { User } = models;
config();

export default (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(402).send({ error: 'UnAuthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, decoded) => {
    if (err) {
      return res.status(404).send({ err });
    }
    req.decoded = decoded;
    User.findByPk(decoded.userId).then((user) => {
      if (!user) {
        return res.status(401).send({ error: 'No user found' });
      }
      next();
    });
  });
};
