const {prisma} = require("../prisma/prisma-client");

/**
 * @route POST /api/likes/add
 * @desc Добавление лайка
 * @access Private
 */
const addLike = async (req, res) => {
  try {
    const {postId, userId} = req.body;

    // Check if the like already exists
    const existingLike = await prisma.likes.findUnique({
      where: {
        postId_userId: {
          postId: +postId,
          userId: +userId,
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({message: "Лайк уже добавлен"});
    }

    // Create the like
    const newLike = await prisma.likes.create({
      data: {
        postId: +postId,
        userId: +userId,
      },
    });

    // Increment the like count in ForumPost
    await prisma.forumPost.update({
      where: {id: +postId},
      data: {likeCount: {increment: 1}},
    });

    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({message: "Что-то пошло не так при добавлении лайка", error: error.message});
  }
};

/**
 * @route DELETE /api/likes/remove/:id
 * @desc Удаление лайка
 * @access Private
 */
const removeLike = async (req, res) => {
  try {
    const likeId = +(req.params.id);

    // Get the like to check if it exists
    const likes = await prisma.likes.findUnique({
      where: {id: likeId},
    });

    if (!likes) {
      return res.status(404).json({message: "Лайк не найден"});
    }

    // Delete the like
    await prisma.likes.delete({
      where: {id: likeId},
    });

    // Decrement the like count in ForumPost
    await prisma.forumPost.update({
      where: {id: likes.postId},
      data: {likeCount: {decrement: 1}},
    });

    res.status(204).json("OK");
  } catch (error) {
    res.status(500).json({message: "Не удалось удалить лайк", error: error.message});
  }
};

/**
 * @route GET /api/likes/user/:userId
 * @desc Получение всех лайков пользователя
 * @access Public
 */
const likesByUser = async (req, res) => {
  try {
    const userId = +(req.params.userId);

    // Get all likes for the user
    const userLikes = await prisma.likes.findMany({
      where: {userId: userId},
      include: {post: true},
    });

    res.status(200).json(userLikes);
  } catch (error) {
    res.status(500).json({message: "Не удалось получить лайки пользователя", error: error.message});
  }
};

module.exports = {
  addLike,
  removeLike,
  likesByUser,
};