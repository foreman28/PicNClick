const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/posts
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const post = await prisma.forumPost.findMany();

    res.status(200).json(post);
  } catch {
    res.status(500).json({ message: "Не удалось получить посты" });
  }
};

/**
 * @route POST /api/posts/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.content || !data.tags) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const post = await prisma.forumPost.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route POST /api/posts/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.forumPost.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Не удалось удалить пост" });
  }
};

/**
 * @route PUT /api/posts/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.forumPost.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch(err) {
    res.status(500).json({ message: "Не удалось редактировать пост" });
  }
};

/**
 * @route GET /api/posts/:id
 * @desc Получение сотрудника
 * @access Private
 */
const post = async (req, res) => {
  const { id } = req.params; // http://localhost:8000/api/employees/9fe371c1-361f-494a-9def-465959ecc098

  try {
    const post = await prisma.forumPost.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(post);
  } catch {
    res.status(500).json({ message: "Не удалось получить пост" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  post,
};