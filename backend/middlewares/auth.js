const jwt = require('jsonwebtoken');

const AuthorizationErr = require('../errors/AuthorizationErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new AuthorizationErr('Необходимо авторизоваться'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthorizationErr('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
};
