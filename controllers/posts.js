const {prisma} = require("../prisma/prisma-client");
const slugify = require('slugify');
const {processImage} = require("../middleware/upload");

function generateSlug(input, options = {}) {
  const defaultOptions = { lower: true, remove: /[*+~.()'"!:@]/g };
  const mergedOptions = { ...defaultOptions, ...options };
  return slugify(input, mergedOptions);
}


/**
 * @route POST /api/posts
 * @desc Получение всех постов // поиск // поиск по тегу // фильтры // сортировка
 * @access Private
 */
const allPosts = async (req, res) => {
  let posts;
  try {
    const {q: search, page, pageSize, filters} = req.body;
    const findManyOptions = {
      where: {},
      include: {
        author: true,
        comments: true,
        likes: true,
        tags: true,
      },
    };

    const countOptions = {
      where: {},
    };

    if (filters?.where?.authorId) { // || filters?.where?.authorId === 0
      findManyOptions.where = {
        authorId: filters.where.authorId
      }
      countOptions.where = {
        authorId: filters.where.authorId
      }
    }

    if (!page && pageSize) {
      findManyOptions.take = +pageSize;
    }

    if (page && pageSize) {
      findManyOptions.skip = ((+page) - 1) * (+pageSize);
      findManyOptions.take = +pageSize;
    }

    let count;

    if (search) {
      if (search.startsWith('@')) {
        const tagSearch = search.substring(1);
        posts = await prisma.forumPost.findMany({
          ...findManyOptions,
          where: {
            tags: {
              some: {
                OR: [
                  {url: {contains: tagSearch, mode: 'insensitive'}},
                  {name: {contains: tagSearch, mode: 'insensitive'}},
                ],
              },
            },
          },
        });
        count = await prisma.forumPost.count({
          ...countOptions,
          where: {
            tags: {
              some: {
                OR: [
                  {url: {contains: tagSearch, mode: 'insensitive'}},
                  {name: {contains: tagSearch, mode: 'insensitive'}},
                ],
              },
            },
          },
        });
      } else {
        posts = await prisma.forumPost.findMany({
          ...findManyOptions,
          where: {
            OR: [
              {title: {contains: search, mode: 'insensitive'}},
              {description: {contains: search, mode: 'insensitive'}},
            ],
          },
        });
        count = await prisma.forumPost.count({
          ...countOptions,
          where: {
            OR: [
              {title: {contains: search, mode: 'insensitive'}},
              {description: {contains: search, mode: 'insensitive'}},
            ],
          },
        });
      }
    } else {
      posts = await prisma.forumPost.findMany({
        ...findManyOptions,
      });
      count = await prisma.forumPost.count({
        ...countOptions,
      });
    }

    // Check if there are sorting filters
    if (filters && filters.sort && filters.order) {
      const orderByField = filters.sort;
      const orderDirection = filters.order.toLowerCase();

      findManyOptions.orderBy = {
        [orderByField]: {
          _count: orderDirection,
        },
      };

      posts = await prisma.forumPost.findMany(findManyOptions);
    }

    res.status(200).json({posts, count});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Не удалось получить посты'});
  }
};
const getPostsCount = async (req, res) => {
  try {
    const {authorId} = req.params

    let findManyOptions = undefined
    if (authorId) {
      findManyOptions = {
        where: {
          authorId: +authorId || 0
        }
      }
    }

    const count = await prisma.forumPost.count({
      ...findManyOptions
    });
    res.json({count});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

/**
 * @route POST /api/posts/add
 * @desc Добавление поста
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    if (!data.title || !data.content || !data.description) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }


    const tags = Array.isArray(data.tags) ? data.tags.join(',') : data.tags;
    let tagsArray = data.tags;

    if (typeof data.tags === 'string') {
      tagsArray = tags.split(',').map(Number);
    }

    const slug = generateSlug(data.title, { lower: true, remove: /[*+~.()'"!:@]/g });

    const postChecker = await prisma.forumPost.findMany({
      where: {
        url: slug
      }
    })

    if (postChecker[0] !== undefined) {
      return res.status(409).json({ message: 'Название занято!' })
    }

    if (file){
      processImage(req.file.buffer, req.file.originalname, async (err, filename) => {
        const imageUrl = `/uploads/${filename}`;

        const post = await prisma.forumPost.create({
          data: {
            title: data.title,
            description: data.description,
            image: imageUrl,
            content: data.content,
            tags: {
              connect: tagsArray.map((tagId) => ({ id: tagId })),
            },
            authorId: req.user.id,
            url: slug,
          },
        });

        return res.status(201).json(post);
      });
    }
    else {
      const imageUrl = '/uploads/stubs/stubs-image.png';

      const post = await prisma.forumPost.create({
        data: {
          title: data.title,
          description: data.description,
          image: imageUrl,
          content: data.content,
          tags: {
            connect: tagsArray.map((tagId) => ({ id: tagId })),
          },
          authorId: req.user.id,
          url: slug,
        },
      });

      return res.status(201).json(post);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route PUT /api/posts/edit/:id
 * @desc Редактирование поста
 * @access Private
 */
const edit = async (req, res) => {
  try {
    const {url} = req.params;
    const data = req.body;
    const file = req.file;
    if (!data.title || !data.content || !data.description) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const tags = Array.isArray(data.tags) ? data.tags.join(',') : data.tags;
    let tagsArray = data.tags;

    if (typeof data.tags === 'string') {
      tagsArray = tags.split(',').map(Number);
    }

    const post = await prisma.forumPost.findMany({
      where: {
        url: url
      }
    })

    const slug = generateSlug(data.title, { lower: true, remove: /[*+~.()'"!:@]/g });

    const postChecker = await prisma.forumPost.findMany({
      where: {
        url: slug
      }
    })

    if (postChecker[0] !== undefined && postChecker[0]?.url !== url) {
      return res.status(409).json({ message: 'Название занято!' })
    }

    if (req.user.role === "ADMIN" || post[0].authorId === req.user.id) {
      if (file) {
        processImage(req.file.buffer, req.file.originalname, async (err, filename) => {
          const imageUrl = `/uploads/${filename}`;

          await prisma.forumPost.update({
            where: {
              url: url,
            },
            data: {
              title: data.title,
              description: data.description,
              image: imageUrl,
              content: data.content,
              tags: {
                set: tagsArray.map((tagId) => ({id: tagId})),
              },
              url: slug,
            },
          });

          res.status(204).json("OK");
        });
      } else {
        await prisma.forumPost.update({
          where: {
            url: url,
          },
          data: {
            title: data.title,
            description: data.description,
            content: data.content,
            tags: {
              set: tagsArray.map((tagId) => ({id: tagId})),
            },
            url: slug,
          },
        });
        res.status(204).json("OK");
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Не удалось редактировать пост"});
  }
};

/**
 * @route POST /api/posts/remove/:id
 * @desc Удаление поста
 * @access Private
 */
const remove = async (req, res) => {
  const {id} = req.params;

  try {
    const post = await prisma.forumPost.findFirst({
      where: {
        id: +id,
      }
    });

    if (req.user.role === "ADMIN" || post.authorId === req.user.id) {
      await prisma.forumPost.delete({
        where: {
          id: +id,
        },
      });

      res.status(204).json("OK");
    } else {
      res.status(401).json("Отказ в доступе");
    }
  } catch {
    res.status(500).json({message: "Не удалось удалить пост"});
  }
};

/**
 * @route GET /api/posts/:url
 * @desc Получение поста
 * @access Private
 */
const post = async (req, res) => {
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

    res.status(200).json(post);
  } catch {
    res.status(500).json({message: "Не удалось получить пост"});
  }
};

module.exports = {
  allPosts,
  getPostsCount,
  add,
  remove,
  edit,
  post
};
