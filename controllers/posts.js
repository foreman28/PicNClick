const {prisma} = require("../prisma/prisma-client");
const slugify = require('slugify');
const {auth} = require("../middleware/auth");

/**
 * @route POST /api/posts
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  console.log(
    1
  )
  try {
    const {q: search, page, pageSize} = req.body;
    console.log(req.body)
    let posts;

    const findManyOptions = {
      include: {
        author: true,
        likes: true,
        tags: true,
      },
    };

    if (page && pageSize) {
      findManyOptions.skip = ((+page) - 1) * (+pageSize);
      findManyOptions.take = +pageSize;
    }

    if (search) {
      // console.log(search)
      if (search.startsWith('@')) {
        // Search by tag
        posts = await prisma.forumPost.findMany({
          ...findManyOptions,
          where: {
            tags: {
              some: {

                OR: [
                  {
                    url: {
                      contains: search.substring(1), // Remove '@' symbol
                      mode: 'insensitive',
                    },

                  },
                  {
                    name: {
                      contains: search.substring(1), // Remove '@' symbol
                      mode: 'insensitive',
                    },
                  }
                ]
              },
            },
          },
        });
      } else {
        // Search by title or description
        posts = await prisma.forumPost.findMany({
          ...findManyOptions,
          where: {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          },
        });
      }
    } else {
      // No search query provided, retrieve all posts
      posts = await prisma.forumPost.findMany(findManyOptions);
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Не удалось получить посты'});
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
    const file = req.file;

    console.log(data);
    // console.log(file);

    const tags = Array.isArray(data.tags) ? data.tags.join(',') : data.tags;
    let tagsArray = data.tags;

    if (typeof data.tags === 'string') {
      tagsArray = tags.split(',').map(Number);
    }

    if (!data.title || !data.content || !data.description) {
      return res.status(400).json({message: "Все поля обязательные"});
    }

    const slug = slugify(data.title, {lower: true, remove: /[*+~.()'"!:@]/g});
    console.log(data.tags)
    const post = await prisma.forumPost.create({
      data: {
        title: data.title,
        description: data.description,
        image: file ? file.path : 'uploads/stubs/stubs-image.png',
        content: data.content,
        tags: {
          connect: tagsArray.map((tagId) => ({ id: tagId })),
        },
        authorId: req.user.id,
        url: slug,
      },
    });

    // console.log(post);

    return res.status(201).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Что-то пошло не так"});
  }
};

/**
 * @route POST /api/posts/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const {id} = req.body;

  try {
    await prisma.forumPost.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({message: "Не удалось удалить пост"});
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
  } catch (err) {
    res.status(500).json({message: "Не удалось редактировать пост"});
  }
};

/**
 * @route GET /api/posts/:id
 * @desc Получение сотрудника
 * @access Private
 */
const post = async (req, res) => {
  // console.log(req.params)
  const {url} = req.params; // http://localhost:8000/api/posts/1

  try {
    const post = await prisma.forumPost.findUnique({
      where: {
        url: url,
        // id: +id,
      },
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
        comments: {
          select: {
            id: true,
            content: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                avatarURL: true,
              },
            },
            post: true,
            userId: true,
            forumPostId: true,
            createdAt: true,
          },
        },
        likes: true,
        tags: true,
      },
    });


    // console.log(post)

    res.status(200).json(post);
  } catch {
    res.status(500).json({message: "Не удалось получить пост"});
  }
};

/**
 * @route POST /api/posts/like/:postId
 * @desc Поставить лайк под постом
 * @access Private
 */
const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const like = await prisma.likes.create({
      data: {
        forumPostId: parseInt(postId, 10),
        userId: req.user.id,
      },
    });

    res.status(201).json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось поставить лайк под постом" });
  }
};
module.exports = {
  all,
  add,
  remove,
  edit,
  post,
  likePost,
};
