const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const controlErrors = require('./middlewares/controlErrors');

const { validatorSchemaPostNewUser, validatorSchemaLogin } = require('./middlewares/validator');

const { postNewUser, login } = require('./controllers/users');

const { checkAuthorization } = require('./middlewares/auth');

const NotFound = require('./utils/errors/not-found');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
//  Подключение к БД
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DB connect');
  })
  .catch(err => {
    console.log(`DB not connect ==> ${err}`);
  });

//  Подключение путей авторизации
//  POST /signup — создаёт пользователя
app.post('/signup', validatorSchemaPostNewUser, postNewUser);
// POST /signin - проверка пользователя, получение JWT
app.post('/signin', validatorSchemaLogin, login);
// GET /signout - выход пользователя, очитска JWT из cookies
app.get('/signout', (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'Пользователь больше не авторизован,токен удален из cookies' });
});
//  Подключение путей пользователей  routes/users
app.use('/', checkAuthorization, require('./routes/users'));
//  Подключение путей карточек  routes/cards
app.use('/', checkAuthorization, require('./routes/cards'));
//  Подключение путей Not Found /*
// Роут неизвестного маршрута также следует защитить авторизацией OK
app.use('/*', checkAuthorization, (req, res, next) => {
  next(new NotFound(`Такого url не существует`));
});
app.use(errors());
app.use(controlErrors);
app.listen(PORT, () => {
  console.log(`Порт приложения ${PORT}`);
});
