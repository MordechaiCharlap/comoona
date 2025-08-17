import { prisma } from "@/lib/prisma";
import { UserProfileData } from "@/types/database";

export async function getUserData(username: string): Promise<UserProfileData | null> {
  const decodedUsername = decodeURIComponent(username);
  const user = await prisma.user.findFirst({
    where: { name: decodedUsername },
    select: {
      id: true,
      name: true,
      email: true,
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          upvotes: true,
          downvotes: true,
          createdAt: true,
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
          createdAt: "desc"
        }
      },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          post: {
            select: {
              id: true,
              title: true,
              SubForum: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });

  return user;
}