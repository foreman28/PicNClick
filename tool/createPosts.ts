import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @ts-ignore
async function createPosts() {
  try {
    for (let i = 1; i <= 10; i++) {
      await prisma.forumPost.create({
        data: {
          title: `Photo Post ${i}`,
          content: `This is a photo post number ${i}.`,
          authorId: 2, // ID 1 as the author
          tags: ['photo', 'photography'],
          imageURL: `https://example.com/photo${i}.jpg`,
          authorAvatar: `https://example.com/avatar${i}.jpg`,
          commentsCount: 0,
          likesCount: 0,
        },
      });
    }
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

createPosts();
