import { prisma } from "@/lib/prisma";
import { PostWithData, PostDetailData } from "@/types/database";

export async function getPosts(): Promise<PostWithData[]> {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      upvotes: true,
      downvotes: true,
      createdAt: true,
      author: {
        select: {
          name: true
        }
      },
      SubForum: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getSubForumPosts(subForumName: string): Promise<PostWithData[]> {
  return await prisma.post.findMany({
    where: {
      SubForum: {
        name: subForumName
      }
    },
    select: {
      id: true,
      title: true,
      content: true,
      upvotes: true,
      downvotes: true,
      createdAt: true,
      author: {
        select: {
          name: true
        }
      },
      SubForum: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPost(postId: string): Promise<PostDetailData | null> {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      title: true,
      content: true,
      upvotes: true,
      downvotes: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
      SubForum: {
        select: {
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}