const {prisma} = require("../prisma/prisma-client");

/**
 * @route POST /api/likes/add
 * @desc Add a like
 * @access Private
 */
const addLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Check if the like already exists
    const existingLike = await prisma.likes.findUnique({
      where: {
        postId_userId: {
          postId: Number(postId),
          userId: Number(userId),
        },
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'Like already added' });
    }

    // Create the like
    const newLike = await prisma.likes.create({
      data: {
        postId: Number(postId),
        userId: Number(userId),
      },
    });

    // Increment the like count in ForumPost
    await prisma.forumPost.update({
      where: { id: Number(postId) },
      data: { likeCount: { increment: 1 } },
    });

    res.status(201).json(newLike);
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ message: 'Something went wrong while adding a like', error: error.message });
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

    // Get the like to check if it exists
    const like = await prisma.likes.findUnique({
      where: { id: likeId },
    });

    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    // Delete the like
    await prisma.likes.delete({
      where: { id: likeId },
    });

    // Decrement the like count in ForumPost
    await prisma.forumPost.update({
      where: { id: like.postId },
      data: { likeCount: { decrement: 1 } },
    });

    res.status(204).json('OK');
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ message: 'Failed to remove like', error: error.message });
  }
};

/**
 * @route GET /api/likes/user/:userId
 * @desc Get all likes for a user
 * @access Public
 */
const getLikesByUser = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    // Get all likes for the user
    const userLikes = await prisma.likes.findMany({
      where: { userId: userId },
      include: { post: true },
    });

    res.status(200).json(userLikes);
  } catch (error) {
    console.error('Error getting likes for user:', error);
    res.status(500).json({ message: 'Failed to get likes for user', error: error.message });
  }
};


module.exports = {
  addLike,
  removeLike,
  getLikesByUser,
};