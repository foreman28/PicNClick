const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcryptjs'); // хеширование пароля
const jwt = require('jsonwebtoken');

const TOKEN_EXPIRATION = '1d';


/**
 * @route GET /api/user/all
 * @desс Users
 * @access Public
 */
const allUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        comments: true,
        likes: true,
      },
    });

    res.status(200).json(users);
  } catch {
    res.status(500).json({message: "Не удалось получить пользователя"});
  }
}

/**
 * @route GET /api/user/:username
 * @desс User
 * @access Public
 */
const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: true,
        comments: true,
        likes: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: "Не удалось получить пользователя"});
  }
}

/**
 * @route POST /api/user/Login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.body)

    if (!username || !password) {
      return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
    }

    const user = await prisma.user.findFirst({
      where: {
        username, // username: username
      }
    });

    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: TOKEN_EXPIRATION }),
        role: user.role,
      })
    } else {
      return res.status(400).json({ message: 'Неверно введен логин или пароль' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

/**
 * @route POST /api/user/Register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res, next) => {
  // console.log(req.body)
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

    const registeredUser2 = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (registeredUser2) {
      return res.status(400).json({ message: 'Пользователь, с таким логином уже существует' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        avatarURL: '/uploads/stubs/stubs-avatar.jpg',
        role: "USER",
      }
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: TOKEN_EXPIRATION }),
        role: user.role,
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
}

/**
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports = {
  allUser,
  getUser,
  login,
  register,
  current
}