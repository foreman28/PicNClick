const {prisma} = require("../prisma/prisma-client");

/**
 * @route POST /api/likes/toggle
 * @desc Toggle like (add if not exists, remove if exists)
 * @access Private
 */
const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    // Check if the like already exists
    const existingLike = await prisma.likes.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingLike) {
      // If like exists, remove it
      await prisma.likes.delete({
        where: { id: existingLike.id },
      });

      res.status(200).json({ message: 'Лайк удален' });
    } else {
      // If like doesn't exist, add it
      const newLike = await prisma.likes.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });

      res.status(201).json(newLike);
    }
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так при обработке лайка', error: error.message });
  }
};

/**
 * @route POST /api/likes/add
 * @desc Add a like
 * @access Private
 */
const addLike = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log(postId)
    console.log(req.user.id)
    // Проверка, существует ли подобное уже
    const existingLike = await prisma.likes.findFirst({
      where: {
        postId: postId,
        userId: req.user.id,
      },
    });

    if (existingLike) {
      return res.status(409).json({ message: 'Лайк уже есть' });
    }

    const like = await prisma.likes.create({
      data: {
        postId: postId,
        userId: req.user.id,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так при добавлении лайка', error: error.message });
  }
};

/**
 * @route DELETE /api/likes/remove/:id
 * @desc Remove a like
 * @access Private
 */
const removeLike = async (req, res) => {
  try {
    const likeId = Number(req.params.id);

    // Проверка существует ли лайк
    const like = await prisma.likes.findUnique({
      where: { id: likeId },
    });

    if (!like) {
      return res.status(404).json({ message: 'Лайк не нашел' });
    }

    // Удалить лайк
    await prisma.likes.delete({
      where: { id: likeId },
    });


    res.status(204).json('OK');
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить лайк', error: error.message });
  }
};

/**
 * @route GET /api/likes/user/:userId
 * @desc Get all likes for a user
 * @access Public
 */
const getLikesByUser = async (req, res) => {
  try {
    const {userId} = req.body;

    // Получите все лайки для пользователя
    const userLikes = await prisma.likes.findMany({
      where: { userId: userId },
      include: { post: true },
    });

    res.status(200).json(userLikes);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить лайки пользователю', error: error.message });
  }
};


module.exports = {
  toggleLike,
  addLike,
  removeLike,
  getLikesByUser,
};