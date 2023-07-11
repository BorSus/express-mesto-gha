const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  postNewUser,
  patchUserInfo,
  patchUserAvatar
} = require('../controllers/users');

//  GET /users — возвращает всех пользователей
router.get('/users', getAllUsers);

//  GET /users/:userId - возвращает пользователя по _id
router.get('/users/:id', getUserById);

//  POST /users — создаёт пользователя
router.post('/users', postNewUser);

// PATCH /users/me — обновляет профиль
router.patch('/users/me', patchUserInfo);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/users/me/avatar', patchUserAvatar);
module.exports = router;

/*  {
  "name": "Юрий Гагарин",
  "about": "ПОЕХАЛИ",
  "avatar": "https://афанасьевский-музей.рф/upload/iblock/fc3/fc31305309e31e12c5cf158e10ae83d6.jpg"
   }  */
