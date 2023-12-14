const {prisma} = require("../prisma/prisma-client");

/**
 * @route GET /api/comment
 * @desc Получение всех комментариев
 * @access Public
 */
const allComments = async (req, res) => {
  try {
    const comments = await prisma.comments.findMany({
      // include: {
      //   Post: true,
      //   user: true
      // },
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({message: "Не удалось получить комментарии"});
  }
};


/**
 * @route GET /api/comment/:id
 * @desc Получение комментария по ID
 * @access Public
 */

const commentById = async (req, res) => {
  const {id} = req.params;

  try {
    const comment = await prisma.comments.findUnique({
      where: {
        id: +id,
      },
      // include: {
      //   Post: true,
      //   user: true
      // },
    });

    if (!comment) {
      return res.status(404).json({message: "Комментарий не найден"});
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({message: "Не удалось получить комментарий"});
  }
};

/**
 * @route POST /api/comment/add
 * @desc Добавление комментария
 * @access Private
 */
const addComment = async (req, res) => {
  console.log(req.body)
  try {
    const { forumPostId, content } = req.body;
    // console.log(req.body)
    const comment = await prisma.comments.create({
      data: {
        userId: Number(req.user.id),
        forumPostId: Number(forumPostId),
        content: content,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так при добавлении комментария", error: error.message });
  }
};

/**
 * @route DELETE /api/comment/remove/:id
 * @desc Удаление комментария
 * @access Private
 */
const removeComment = async (req, res) => {
  const {id} = req.params;

  try {
    await prisma.comments.delete({
      where: {
        id: +id,
      },
    });

    res.status(204).json("OK");
  } catch (error) {
    res.status(500).json({message: "Не удалось удалить комментарий"});
  }
};

/**
 * @route PUT /api/comment/edit/:id
 * @desc Редактирование комментария
 * @access Private
 */
const editComment = async (req, res) => {
  const {id} = req.params;
  const {content} = req.body;

  try {
    const updatedComment = await prisma.comments.update({
      where: {
        id: +id,
      },
      data: {
        content,
      },
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({message: "Не удалось обновить комментарий"});
  }
};

module.exports = {
  allComments,
  commentById,
  addComment,
  removeComment,
  editComment,
};
