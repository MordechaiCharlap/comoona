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

export type UserPostData = {
  id: string;
  title: string;
  content: string | null;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  SubForum: { name: string };
  _count: { comments: number };
};

export type UserCommentData = {
  id: string;
  content: string;
  createdAt: Date;
  post: {
    id: string;
    title: string;
    SubForum: { name: string };
  };
};

export type UserProfileData = {
  id: string;
  name: string;
  email: string;
  posts: UserPostData[];
  comments: UserCommentData[];
};

export type PostCommentData = {
  id: string;
  content: string;
  createdAt: Date;
  author: { name: string };
};

export type PostDetailData = {
  id: string;
  title: string;
  content: string | null;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  author: { name: string };
  SubForum: { name: string };
  comments: PostCommentData[];
  _count: { comments: number };
};