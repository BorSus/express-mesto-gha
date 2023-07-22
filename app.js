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
// использовать библиотеку helmet, это набор middleware функций для express, который помогает защитить ваше приложение
app.use(helmet());
app.use(cookieParser());

//  Подключение к БД
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DB connect');
  })
  .catch(err => {
    console.log(`DB not connect ==> ${err}`);
  });
// формирование JSON-формата
app.use(bodyParser.json());

//  Подключение путей авторизации
//  POST /signup — создаёт пользователя
app.post('/signup', validatorSchemaPostNewUser, postNewUser);
// POST /signin - проверка пользователя, получение JWT
app.post('/signin', validatorSchemaLogin, login);

//  Подключение путей пользователей  routes/users
app.use('/', checkAuthorization, require('./routes/users'));
//  Подключение путей карточек  routes/cards
app.use('/', checkAuthorization, require('./routes/cards'));

//  Подключение путей Not Found /*
app.use('/*', (req, res, next) => {
  next(new NotFound(`Такого url не существует`));
  return;
});
app.use(errors());
app.use(controlErrors);

app.listen(PORT, () => {
  console.log(`Порт приложения ${PORT}`);
});
