"use client";

import { Card, Text, Avatar, Button } from "@/components";
import { usePathname, useRouter } from "next/navigation";
import { PostWithData } from "@/types/database";
import Link from "next/link";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "לפני פחות משעה";
  if (diffInHours === 1) return "לפני שעה";
  if (diffInHours < 24) return `לפני ${diffInHours} שעות`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "לפני יום";
  return `לפני ${diffInDays} ימים`;
}

interface PostCardProps {
  post: PostWithData;
}

export const PostCard = ({ post }: PostCardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isOnSubForumPage = pathname.startsWith(`/c/${post.SubForum.name}`);

  const handleCardClick = () => {
    const postTitleSlug = post.title.replace(/\s+/g, "_");
    router.push(
      `/c/${encodeURIComponent(post.SubForum.name)}/posts/${
        post.id
      }/${encodeURIComponent(postTitleSlug)}`
    );
  };

  return (
    <Card
      className="mb-4 cursor-pointer hover:opacity-90 transition-opacity"
      padding="md"
      onClick={handleCardClick}
    >
      <div className="flex gap-3" dir="rtl">
        {/* Content Section */}
        <div className="flex-1">
          {/* Post Header */}
          <div className="flex items-center gap-2 mb-2" dir="rtl">
            <Text size="sm" variant="muted">
              {formatTimeAgo(post.createdAt)}
            </Text>
            <Text>•</Text>
            {isOnSubForumPage ? (
              <div className="flex items-center gap-1">
                <Text size="sm" variant="muted">
                  נכתב על ידי
                </Text>
                <Link
                  href={`/u/${post.author.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Text
                    size="sm"
                    weight="medium"
                    className="hover:underline cursor-pointer"
                  >
                    u/{post.author.name}
                  </Text>
                </Link>
              </div>
            ) : (
              <Link
                href={`/c/${encodeURIComponent(post.SubForum.name)}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Text
                  size="sm"
                  variant="muted"
                  className="hover:underline cursor-pointer"
                >
                  c/{post.SubForum.name}
                </Text>
              </Link>
            )}
          </div>

          {/* Post Title */}
          <Text size="lg" weight="semibold" className="text-right">
            {post.title}
          </Text>

          {/* Post Content */}
          {post.content && (
            <Text variant="secondary" className="mb-3 line-clamp-3 text-right">
              {post.content}
            </Text>
          )}

          {/* Post Actions */}
          <div className="flex items-center gap-4" dir="rtl">
            <Button variant="ghost" size="sm">
              <Text size="sm">💬 {post._count.comments} תגובות</Text>
            </Button>
            {/* <Button variant="ghost" size="sm">
              <Text size="sm">📤 שתף</Text>
            </Button> */}
            {/* <Button variant="ghost" size="sm">
              <Text size="sm">💾 שמור</Text>
            </Button> */}
          </div>
        </div>

        {/* Vote Section */}
        <div className="flex flex-col items-center gap-1 pt-2">
          <Button variant="ghost" size="sm" className="p-1">
            <Text size="lg">↑</Text>
          </Button>
          <Text size="sm" weight="medium">
            {post.upvotes - post.downvotes}
          </Text>
          <Button variant="ghost" size="sm" className="p-1">
            <Text size="lg">↓</Text>
          </Button>
        </div>
      </div>
    </Card>
  );
};
