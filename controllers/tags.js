const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/tags
 * @desc Получение всех тегов
 * @access Public
 */
const allTags = async (req, res) => {
  try {
    const { search } = req.query;

    let tags;

    if (search) {
      tags = await prisma.tags.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        include: {
          posts: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  fullName: true,
                  avatarURL: true,
                },
              },
              comments: true,
              tags: true,
            },
          },
        },
      });
    } else {
      tags = await prisma.tags.findMany({
        include: {
          posts: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  fullName: true,
                  avatarURL: true,
                },
              },
              comments: true,
              tags: true,
            },
          },
        },
      });
    }

    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: "Не удалось получить теги" });
  }
};


/**
 * @route GET /api/tags/:id
 * @desc Получение тега по ID
 * @access Public
 */

const tagById = async (req, res) => {
  const { name } = req.params;

  try {
    const tag = await prisma.tags.findUnique({
      where: {
        name,
      },
      include: {
        posts: true,
      },
    });

    if (!tag) {
      return res.status(404).json({ message: "Тег не найден" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error('Error fetching tag by ID:', error);
    res.status(500).json({ message: "Не удалось получить тег" });
  }
};

/**
 * @route POST /api/tags/add
 * @desc Добавление тега
 * @access Private
 */
const addTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Имя тега обязательно" });
    }

    const tag = await prisma.tags.create({
      data: {
        name,
      },
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error('Error adding tag:', error);
    res.status(500).json({ message: "Что-то пошло не так при добавлении тега" });
  }
};

/**
 * @route DELETE /api/tags/remove/:id
 * @desc Удаление тега
 * @access Private
 */
const removeTag = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tags.delete({
      where: {
        id: +id,
      },
    });

    res.status(204).json("OK");
  } catch (error) {
    console.error('Error removing tag:', error);
    res.status(500).json({ message: "Не удалось удалить тег" });
  }
};

/**
 * @route PUT /api/tags/edit/:id
 * @desc Редактирование тега
 * @access Private
 */
const editTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedTag = await prisma.tags.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    res.status(200).json(updatedTag);
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: "Не удалось обновить тег" });
  }
};

module.exports = {
  allTags,
  tagById,
  addTag,
  removeTag,
  editTag,
};
