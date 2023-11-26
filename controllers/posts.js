const {prisma} = require("../prisma/prisma-client");
const slugify = require('slugify');
const {auth} = require("../middleware/auth");

/**
 * @route GET /api/posts
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const {search, page, pageSize} = req.query;
    console.log(search)
    let posts;

    const findManyOptions = {
      include: {
        author: true,
        tags: true,
      },
    };

    if (page && pageSize) {
      findManyOptions.skip = ((+page) - 1) * (+pageSize);
      findManyOptions.take = +pageSize;
    }

    if (search) {
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
    console.error('Error fetching posts:', error);
    res.status(500).json({message: 'Не удалось получить посты'});
  }
};


/**
 * @route POST /api/posts/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  if (auth) {
    console.log(1)
  }
  try {
    const data = req.body;
    console.log(data)
    if (!data.title || !data.content || !data.tags) {
      return res.status(400).json({message: "Все поля обязательные"});
    }

    const slug = slugify(data.title, {lower: true, remove: /[*+~.()'"!:@]/g}); // Генерация уникального URL

    const post = await prisma.forumPost.create({
      data: {
        ...data,
        imageURL: req.imageURL ? req.imageURL : "/img/image-1.png",
        authorId: req.user.id,
        likesCount: 0,
        commentsCount: 0,
        url: slug, // Сохранение уникального URL
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Что-то пошло не так"});
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
        comments: true,
        tags: true,
      },
    });


    console.log(post)

    res.status(200).json(post);
  } catch {
    res.status(500).json({message: "Не удалось получить пост"});
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  post,
};
