const { celebrate, Joi } = require('celebrate');

// Authorization
//  POST /signup — создаёт пользователя
const validatorSchemaPostNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      new RegExp(
        "^(http|https|)://|[a-zA-Z0-9-.]+.[a-zA-Z](:[a-zA-Z0-9]*)?/?([a-zA-Z0-9-._?,'/\\+&amp;%$#=~])*[^.,)(s]$"
      )
    ),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })
});
// POST /signin - проверка пользователя, получение JWT
const validatorSchemaLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  })
});

//  Users
// GET /users/me
const validatorSchemaGetCurrentUser = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
});
// GET /users/:userId - возвращает пользователя по _id
const validatorSchemaGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
});
// PATCH /users/me — обновляет профиль
const validatorSchemaPatchUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
});
// PATCH /users/me/avatar — обновляет аватар
const validatorSchemaPatchUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(' '))
  })
});
//Cards
const validatorSchemaPostCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(
      new RegExp(
        "^(http|https|)://|[a-zA-Z0-9-.]+.[a-zA-Z](:[a-zA-Z0-9]*)?/?([a-zA-Z0-9-._?,'/\\+&amp;%$#=~])*[^.,)(s]$"
      )
    )
  })
});
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки
const validatorSchemaCardsById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required()
  })
});
module.exports = {
  validatorSchemaPostNewUser,
  validatorSchemaLogin,
  validatorSchemaGetUserById,
  validatorSchemaGetCurrentUser,
  validatorSchemaPatchUserInfo,
  validatorSchemaPatchUserAvatar,
  validatorSchemaPostCard,
  validatorSchemaCardsById
};
