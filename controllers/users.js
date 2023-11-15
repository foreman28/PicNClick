const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt'); // хеширование пароля
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    // console.log('Cookies: ', req.cookies)
    const { username, password } = req.body;

    console.log(req.body)
    if (!username || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязятельные поля' })
    }
  
    const user = await prisma.user.findFirst({
      where: {
        username, // email: email
      }
    });
  
    const isPasswordCorrect = user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;
  
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        username: user.username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d' })
      })
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

/**
 * 
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res, next) => {
  console.log(req.body)
  try {
    const { email, password, username } = req.body;

    if(!email || !password || !username) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (registeredUser) {
      return res.status(400).json({ message: 'Пользователь, с таким email уже существует' })
    }

    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassord
      }
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

/**
 * 
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports = {
  login,
  register,
  current
}