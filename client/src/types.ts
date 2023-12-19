import { ForumPost, User, Comments as CommentsT } from "@prisma/client";

export type Role = 'USER' | 'ADMIN';

export type UserWithCommentsAndPosts = User & {
  comments: CommentsT[];
  posts: ForumPost[];
};

export type ForumPostWithAuthorAndComments = ForumPost & {
  author: User;
  comments: CommentsT[];
};

export type CommentsWithUser = CommentsT & {
  user: User;
};

