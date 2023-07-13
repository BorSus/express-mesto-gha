const User = require('../models/user');
//  GET /users — возвращает всех пользователей
function getAllUsers(req, res) {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(() =>
      res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)`
      })
    );
}
//  GET /users/:userId - возвращает пользователя по _id
function getUserById(req, res) {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then(user => {
      return res.status(200).send(user);
    })
    .catch(err => {
      console.log(err.name);
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Произошла ошибка: Not Found («не найдено»)' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: `Произошла ошибка:Bad Request («неправильный, некорректный запрос»)`
        });
      }
      return res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)`
      });
    });
}
//  POST /users — создаёт пользователя
function postNewUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(err => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: `Произошла ошибка:Bad Request («неправильный, некорректный запрос»)=>> ${Object.values(
            err.errors
          )
            .map(error => error.message)
            .join(', ')}`
        });
      }
      return res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)}`
      });
    });
}
// PATCH /users/me — обновляет профиль
function patchUserInfo(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: `Произошла ошибка:Bad Request («неправильный, некорректный запрос»)=>> ${Object.values(
            err.errors
          )
            .map(error => error.message)
            .join(', ')}`
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Произошла ошибка: Not Found («не найдено»)'
        });
      }

      return res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)}`
      });
    });
}
// PATCH /users/me/avatar — обновляет аватар
function patchUserAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message: `Произошла ошибка:Bad Request («неправильный, некорректный запрос»)=>> ${Object.values(
            err.errors
          )
            .map(error => error.message)
            .join(', ')}`
        });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Произошла ошибка: Not Found («не найдено»)'
        });
      }
      return res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)}`
      });
    });
}

module.exports = { getAllUsers, getUserById, postNewUser, patchUserInfo, patchUserAvatar };
