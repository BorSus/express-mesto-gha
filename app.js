const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

//  Подключение к БД
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('DB connect');
  })
  .catch(err => {
    console.log(`DB not connect ==> ${err}`);
  });
// формирование JSON-формата
app.use(bodyParser.json());
// использование id
app.use((req, res, next) => {
  req.user = {
    _id: '64ac680996d39959db5d6105'
  };
  next();
});
//  Подключение путей пользователей  routes/users
app.use('/', require('./routes/users'));
//  Подключение путей карточек  routes/cards
app.use('/', require('./routes/cards'));

//  Подключение путей Not Found /*
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Произошла ошибка: Not Found («не найдено»)' });
});

app.listen(PORT, () => {
  console.log(`Порт приложения ${PORT}`);
});
