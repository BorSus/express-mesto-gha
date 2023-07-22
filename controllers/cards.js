const Card = require('../models/card');
const NotFound = require('../utils/errors/not-found');
const BadRequest = require('../utils/errors/bad-request');
const NotUnique = require('../utils/errors/not-unique');
const Unauthorized = require('../utils/errors/unauthorized');
const Forbidden = require('../utils/errors/no-access');
// GET /cards — возвращает все карточки
function getAllCards(req, res, next) {
  Card.find({})
    .then(cards => res.status(200).send(cards))
    .catch(next);
}

// POST /cards — создаёт карточку
function postCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;
  if (!owner) {
    throw new Unauthorized(`Пользователь не авторизован`);
  }
  Card.create({ name, link, owner })
    .then(card => res.status(201).send(card))
    .catch(err => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(
          new BadRequest(
            `${Object.values(err.errors)
              .map(error => error.message)
              .join(', ')}`
          )
        );
        return;
      }
      next(err);
    });
}

// DELETE /cards/:cardId — удаляет карточку по идентификатору
async function deleteCard(req, res, next) {
  const { id } = req.params;
  const owner = req.user._id;
  try {
    const card = await Card.findById(id).orFail();
    if (card.owner.toString() !== owner) {
      throw new Forbidden(`Запрещено удалять карточки чужих авторов`);
    }
    await Card.deleteOne(card);
    return res.status(200).send({
      message: `${card} - delete `
    });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(`${err}`));
      return;
    }
    if (err.name === 'DocumentNotFoundError') {
      next(new NotFound(`Карточка  ${id} не найдена`));
      return;
    }
    next(err);
  }
}

// PUT /cards/:cardId/likes — поставить лайк карточке
function putLike(req, res, next) {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then(card => {
      res.status(200).send(card);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        next(new BadRequest(`${err}`));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(`Карточка  ${id} не найдена`));
        return;
      }
      next(err);
    });
}

// DELETE /cards/:cardId/likes — убрать лайк с карточки
function deleteLike(req, res, next) {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then(card => {
      res.status(200).send(card);
    })
    .catch(err => {
      if (err.name === 'CastError') {
        next(new BadRequest(`${err}`));
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFound(`Карточка  ${id} не найдена`));
        return;
      }
      next(err);
    });
}

module.exports = { getAllCards, postCard, deleteCard, putLike, deleteLike };
