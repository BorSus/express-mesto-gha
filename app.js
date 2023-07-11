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
  .catch(() => {
    console.log('DB not connect');
  });
// собирания JSON-формата
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64ac680996d39959db5d6105'
  };
  next();
});

//  Подключаем пути пользователей  routes/users
app.use('/', require('./routes/users'));
//  Подключаем пути пользователей  routes/cards
app.use('/', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`Порт приложения ${PORT}`);
});
