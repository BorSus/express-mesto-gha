const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  //  name — имя карточки, строка от 2 до 30 символов, обязательное поле;
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  //  link — ссылка на картинку, строка, обязательно поле.
  link: {
    type: String,
    required: true
  },
  //  owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  //  likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: []
    }
  ],
  //  createdAt — дата создания, тип Date, значение по умолчанию Date.now.
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);
