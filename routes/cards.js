const router = require('express').Router();
const { validatorSchemaPostCard, validatorSchemaCardsById } = require('../middlewares/validator');
const { getAllCards, postCard, deleteCard, putLike, deleteLike } = require('../controllers/cards');

// GET /cards — возвращает все карточки
router.get('/cards', getAllCards);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete('/cards/:id', validatorSchemaCardsById, deleteCard);

// POST /cards — создаёт карточку
router.post('/cards', validatorSchemaPostCard, postCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put('/cards/:id/likes', validatorSchemaCardsById, putLike);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/cards/:id/likes', validatorSchemaCardsById, deleteLike);
module.exports = router;
/*
  newCards: [
    {
      name: "Санкт-Петербург",
      link: "https://vskali.ru/wp-content/uploads/2021/03/e1afaa48164c167c107e721f8656c75d-2.jpg"
    },
    {
      "name": "Москва",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/046b22edf7fbbd0afd3b9ef5918465cd-2.jpg"
    },
    {
      "name": "Волгоград",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/1be979eeaed37d0fc8c5b8e72ce776b8-2.jpg"
    },
    {
      "name": "Казань",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/d152aa29d49346fce0eb8da66b7c4d98-2.jpg"
    },
    {
      "name": "Нижний Новгород",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/c65dab66e1005c237a057114b65a11c4-2.jpg"
    },
    {
      "name": "Екатеринбург",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/65623bf0bcfa140b6ba7009462d2bb1f-2.jpg"
    },
    {
      "name": "Владимир",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/05d89718e98565e3b81e1afabe51343f-2.jpg"
    } /*,

    {
      "name": "Калининград",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/602547f34e5ce40182ae696272c0b483-2.jpg"
    },
    {
      "name": "Архангельск",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/82d4d95de331c5630848c43e82211c36-2.jpg"
    },
    {
      "name": "Красноярск",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/42c36887c63568953cecab8a4bad587d-2.jpg"
    },
    {
      "name": "Ярославль",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/998770021a8642b5c2bbceacd781413f-2.jpg"
    },
    {
      "name": "Псков",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/2b6de5e46d55b51ddf31798fa8b64df2-2.jpg"
    },
    {
      "name": "Воронеж",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/6032c232238d6206fee0d585ffb5ffdb-2.jpg"
    },
    {
      "name": "Суздаль",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/4e2f97f2721fb58def547a587293fb45-2.jpg"
    },
    {
      "name": "Вологда",
      "link": "https://vskali.ru/wp-content/uploads/2021/03/9f0976b13a5bdcb18f26bf7af5d330d3-2.jpg"
    }
  ]
*/
