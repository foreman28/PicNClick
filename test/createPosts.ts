import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

// start: ts-node createPosts.ts



interface Tag {
  id: number;
}

// Function to get a random number of tags to connect
function getRandomTagCount(maxCount: number): number {
  return Math.floor(Math.random() * maxCount) + 1;
}

// Function to get a random tag ID from an array of tags
function getRandomTag(tags: Tag[]): Tag {
  const randomIndex = Math.floor(Math.random() * tags.length);
  return tags[randomIndex];
}
// @ts-ignore
(async () => {
  try {
    // Assuming you have retrieved the available tags from your database
    const allTags: Tag[] = await prisma.tags.findMany();
    
    for (let i = 1; i <= 100; i++) {
      const randomTagCount = getRandomTagCount(3); // Change 3 to the maximum number of tags per post
      
      // @ts-ignore
      const tagsToConnect: Tag[] = Array.from({ length: randomTagCount }, () => getRandomTag(allTags));
      
      await prisma.forumPost.create({
        data: {
          title: `Photo Post ${i}`,
          url: `photo-post-${i}`,
          description: `This is a description ${i}.`,
          content: `This is a photo post number ${i}.`,
          authorId: 1, // ID 1 as the author
          tags: {
            connect: tagsToConnect.map((tag) => ({ id: tag.id })),
          },
          image: `/uploads/stubs/stubs-image.png`,
          // commentsCount: 12,
          // likesCount: 33,
        },
      });
    }
  } catch (error) {
    console.error('Error creating posts:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
