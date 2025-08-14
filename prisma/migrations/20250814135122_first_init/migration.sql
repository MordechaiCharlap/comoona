/*
  Warnings:

  - You are about to drop the column `subredditId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Subreddit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subForumId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_subredditId_fkey";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "subredditId",
ADD COLUMN     "subForumId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Subreddit";

-- CreateTable
CREATE TABLE "public"."SubForum" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubForum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubForum_name_key" ON "public"."SubForum"("name");

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_subForumId_fkey" FOREIGN KEY ("subForumId") REFERENCES "public"."SubForum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
