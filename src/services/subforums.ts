import { prisma } from "@/lib/prisma";
import { SubForumData } from "@/types/database";

export async function getSubForum(name: string): Promise<SubForumData | null> {
  return await prisma.subForum.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
    },
  });
}

export async function getAllSubForums(): Promise<SubForumData[]> {
  return await prisma.subForum.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}