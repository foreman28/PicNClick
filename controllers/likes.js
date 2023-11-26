const { prisma } = require("../prisma/prisma-client");

/**
 * @route POST /api/likes/add
 * @desc Добавление лайка
 * @access Private
 */
const addLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "ID поста и пользователя обязательны" });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: +postId,
        userId: +userId,
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "Лайк уже существует" });
    }

    const like = await prisma.like.create({
      data: {
        postId: +postId,
        userId: +userId,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ message: "Что-то пошло не так при добавлении лайка", error: error.message });
  }
};

/**
 * @route DELETE /api/likes/remove/:id
 * @desc Удаление лайка
 * @access Private
 */
const removeLike = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.like.delete({
      where: {
        id: +id,
      },
    });

    res.status(204).json("OK");
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ message: "Не удалось удалить лайк" });
  }
};

/**
 * @route GET /api/likes/user/:userId
 * @desc Получение всех лайков пользователя
 * @access Public
 */
const likesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await prisma.like.findMany({
      where: {
        userId: +userId,
      },
    });

    res.status(200).json(likes);
  } catch (error) {
    console.error('Error fetching likes by user:', error);
    res.status(500).json({ message: "Не удалось получить лайки пользователя" });
  }
};

module.exports = {
  addLike,
  removeLike,
  likesByUser,
};
