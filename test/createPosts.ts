import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// start: ts-node createPosts.ts


// @ts-ignore
(async () => {
  try {
    for (let i = 1; i <= 10; i++) {
      await prisma.forumPost.create({
        data: {
          title: `Photo Post ${i}`,
          url: `photo-post-${i}`,
          description: `This is a description ${i}.`,
          content: `This is a photo post number ${i}.`,
          authorId: 1, // ID 1 as the author
          tags: {
            connect: [
              {id: 1},
              {id: 2},
            ],
          },
          // imageURL: `${process.env.REACT_APP_API_URL}/photo${i}.jpg`,
          imageURL: `/img/image-1.png`,
          commentsCount: 12,
          likesCount: 33,
          
        },
      });
    }
  } catch (error) {
    console.error('Error creating posts:', error);
  } finally {
    await prisma.$disconnect();
  }
})();