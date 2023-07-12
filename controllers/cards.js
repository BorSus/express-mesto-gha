const Card = require('../models/card');

// GET /cards — возвращает все карточки
function getAllCards(req, res) {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(err =>
      res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)=>> ${Object.values(err.errors)
          .map(error => error.message)
          .join(', ')}`
      })
    );
}

// POST /cards — создаёт карточку
function postCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.status(201).send(card))
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
        message: `Произошла ошибка: Server Error (ошибка сервера)`
      });
    });
}

// DELETE /cards/:cardId — удаляет карточку по идентификатору
function deleteCard(req, res) {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then(card => {
      if (!card) {
        return res.status(404).send({ message: 'Произошла ошибка:Not Found («не найдено»)' });
      }
      return res.status(200).send(card);
    })
    .catch(err => {
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

// PUT /cards/:cardId/likes — поставить лайк карточке
function putLike(req, res) {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (!card) {
        return res.status(404).send({ message: 'Произошла ошибка: Not Found («не найдено»)' });
      }
      return res.status(200).send(card);
    })
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Произошла ошибка:Not Found («не найдено»)'
        });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: `Произошла ошибка:Bad Request («неправильный, некорректный запрос»)`
        });
      }
      return res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)}`
      });
    });
}

// DELETE /cards/:cardId/likes — убрать лайк с карточки
function deleteLike(req, res) {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => {
      if (!card) {
        return res.status(404).send({ message: 'Произошла ошибка: Not Found («не найдено»)' });
      }
      return res.status(200).send(card);
    })
    .catch(err => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Произошла ошибка: Not Found («не найдено»)' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: `Произошла ошибка:Bad Request («неправильный, некорректный запрос»)`
        });
      }
      return res.status(500).send({
        message: `Произошла ошибка: Server Error (ошибка сервера)}`
      });
    });
}

module.exports = { getAllCards, postCard, deleteCard, putLike, deleteLike };
