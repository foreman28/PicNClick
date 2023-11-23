import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// start: ts-node createUsers.ts
// {
//     "username": "asd",
//     "email": "asd@asd.asd",
//     "password": "123456"
// }

// @ts-ignore
async function createUsers() {
  try {
    for (let i = 1; i <= 1; i++) {
      await prisma.user.create({
        data: {
          username: `asd${i}`,
          email: `asd${i}@gmail.com`,
          password: `123456`,
        },
      });
    }
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();
