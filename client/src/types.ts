import {ForumPost, User, Comments, Likes} from "@prisma/client";

export type Role = 'USER' | 'ADMIN';

export type UserAll = User & {
  likes: Likes[];
  comments: Comments[];
  posts: ForumPost[];
};

export type ForumPostWithAuthorAndComments = ForumPost & {
  author: User;
  comments: Comments[];
};

export type CommentsWithUser = Comments & {
  user: User;
};

