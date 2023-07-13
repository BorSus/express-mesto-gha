const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    //  name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
    name: {
      type: String,
      required: [true, 'Поле "name" не может быть пустым'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30']
    },
    //  about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
    about: {
      type: String,
      required: [true, 'Поле "name" не может быть пустым'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30']
    },
    //  avatar — ссылка на аватарку, строка, обязательное поле. В следующем спринте вы напишите собственное решение для валидации этого поля.
    avatar: {
      type: String,
      validate: {
        validator: v => validator.isURL(v),
        message: 'Некорректный URL'
      },
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
