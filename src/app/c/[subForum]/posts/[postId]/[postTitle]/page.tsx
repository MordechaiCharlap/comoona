import { Screen, Container, Header, Card, Text, Button } from "@/components";
import { getPost } from "@/services";
import { PostCommentData } from "@/types/database";
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

interface PostPageProps {
  params: Promise<{ subForum: string; postId: string; postTitle: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { subForum, postId } = await params;
  const decodedSubForum = decodeURIComponent(subForum);
  const post = await getPost(postId);

  if (!post) {
    return (
      <Screen>
        <Header />
        <Container className="py-6">
          <Card padding="lg" className="text-center">
            <Text size="lg">Post not found</Text>
          </Card>
        </Container>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header />
      <Container className="py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Post Card */}
            <Card className="mb-4" padding="md">
              <div className="flex gap-3" dir="rtl">
                {/* Content Section */}
                <div className="flex-1">
                  {/* Post Header */}
                  <div className="flex items-center gap-2 mb-3" dir="rtl">
                    <Text size="sm" variant="muted">
                      {formatTimeAgo(post.createdAt)}
                    </Text>
                    <Text>•</Text>
                    <div className="flex items-center gap-1">
                      <Text size="sm" variant="muted">
                        נכתב על ידי
                      </Text>
                      <Link href={`/u/${post.author.name}`}>
                        <Text
                          size="sm"
                          weight="medium"
                          className="hover:underline cursor-pointer"
                        >
                          u/{post.author.name}
                        </Text>
                      </Link>
                      <Text size="sm" variant="muted">
                        ב
                      </Text>
                      <Link
                        href={`/c/${encodeURIComponent(post.SubForum.name)}`}
                      >
                        <Text
                          size="sm"
                          variant="muted"
                          className="hover:underline cursor-pointer"
                        >
                          c/{post.SubForum.name}
                        </Text>
                      </Link>
                    </div>
                  </div>
                  {/* Post Title */}
                  <div className="mb-3">
                    <Text size="xl" weight="bold" className="text-right">
                      {post.title}
                    </Text>
                  </div>

                  {/* Post Content */}
                  {post.content && (
                    <div className="mb-4">
                      <Text
                        variant="secondary"
                        className="text-right whitespace-pre-wrap block"
                      >
                        {post.content}
                      </Text>
                    </div>
                  )}
                  {/* Post Actions */}
                  <div className="flex items-center gap-4" dir="rtl">
                    <Button variant="ghost" size="sm">
                      <Text size="sm">💬 {post._count.comments} תגובות</Text>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Text size="sm">📤 שתף</Text>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Text size="sm">💾 שמור</Text>
                    </Button>
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

            {/* Comments Section */}
            <Card padding="md">
              <div dir="rtl">
                <Text size="lg" weight="semibold" className="mb-4">
                  תגובות ({post.comments.length})
                </Text>
              </div>

              {post.comments.length > 0 ? (
                <div className="space-y-4">
                  {post.comments.map((comment: PostCommentData) => (
                    <div
                      key={comment.id}
                      className="border-b pb-4 last:border-b-0"
                      dir="rtl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Link href={`/u/${comment.author.name}`}>
                          <Text
                            size="sm"
                            weight="medium"
                            className="hover:underline cursor-pointer"
                          >
                            u/{comment.author.name}
                          </Text>
                        </Link>
                        <Text>•</Text>
                        <Text size="sm" variant="muted">
                          {formatTimeAgo(comment.createdAt)}
                        </Text>
                      </div>
                      <Text className="text-right">{comment.content}</Text>
                    </div>
                  ))}
                </div>
              ) : (
                <Text variant="muted" className="text-center">
                  אין תגובות עדיין
                </Text>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80">
            <Card padding="md">
              <Text size="lg" weight="semibold" className="mb-4">
                About c/{decodedSubForum}
              </Text>
              <div className="space-y-2">
                <Button variant="primary" className="w-full">
                  Join Community
                </Button>
                <Button variant="secondary" className="w-full">
                  Create Post
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Screen>
  );
}
