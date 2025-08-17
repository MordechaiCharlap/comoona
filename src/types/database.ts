// Database query result types

export type PostWithData = {
  id: string;
  title: string;
  content: string | null;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  author: { name: string };
  SubForum: { name: string };
  _count: { comments: number };
};

export type UserData = {
  id: string;
  name: string;
  email: string;
};

export type SubForumData = {
  id: string;
  name: string;
};

export type CommentData = {
  id: string;
  content: string;
  createdAt: Date;
  author: { name: string };
};