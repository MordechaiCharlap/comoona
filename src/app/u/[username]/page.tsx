import {
  Screen,
  Container,
  Header,
  Card,
  Text,
} from "@/components";
import { getUserData } from "@/services";
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

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params;
  const user = await getUserData(username);

  if (!user) {
    return (
      <Screen>
        <Header />
        <Container className="py-6">
          <Card padding="lg" className="text-center">
            <Text size="lg">User not found</Text>
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
            {/* User Info */}
            <Card className="mb-6" padding="md">
              <Text size="xl" weight="bold" className="mb-2">
                u/{user.name}
              </Text>
              <div className="flex gap-6 text-sm">
                <Text variant="muted">
                  {user.posts.length} posts
                </Text>
                <Text variant="muted">
                  {user.comments.length} comments
                </Text>
              </div>
            </Card>

            {/* Posts Section */}
            <Card className="mb-6" padding="md">
              <Text size="lg" weight="semibold" className="mb-4">
                Posts ({user.posts.length})
              </Text>
              
              {user.posts.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {user.posts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/c/${encodeURIComponent(post.SubForum.name)}/posts/${post.id}/${encodeURIComponent(post.title.replace(/\s+/g, '_'))}`}
                    >
                      <div className="border-b pb-4 last:border-b-0 hover:bg-opacity-50 hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-2" dir="rtl">
                          <Text size="sm" variant="muted">
                            {formatTimeAgo(post.createdAt)}
                          </Text>
                          <Text>•</Text>
                          <Text size="sm" variant="muted">
                            c/{post.SubForum.name}
                          </Text>
                          <Text>•</Text>
                          <Text size="sm" variant="muted">
                            {post._count.comments} תגובות
                          </Text>
                        </div>
                        <Text weight="medium" className="text-right mb-1">
                          {post.title}
                        </Text>
                        {post.content && (
                          <Text size="sm" variant="muted" className="text-right line-clamp-2">
                            {post.content}
                          </Text>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Text variant="muted" className="text-center">
                  No posts yet
                </Text>
              )}
            </Card>

            {/* Comments Section */}
            <Card padding="md">
              <Text size="lg" weight="semibold" className="mb-4">
                Comments ({user.comments.length})
              </Text>
              
              {user.comments.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {user.comments.map((comment) => (
                    <Link 
                      key={comment.id} 
                      href={`/c/${encodeURIComponent(comment.post.SubForum.name)}/posts/${comment.post.id}/${encodeURIComponent(comment.post.title.replace(/\s+/g, '_'))}`}
                    >
                      <div className="border-b pb-4 last:border-b-0 hover:bg-opacity-50 hover:bg-gray-100 p-2 rounded cursor-pointer transition-colors">
                        <div className="flex items-center gap-2 mb-2" dir="rtl">
                          <Text size="sm" variant="muted">
                            {formatTimeAgo(comment.createdAt)}
                          </Text>
                          <Text>•</Text>
                          <Text size="sm" variant="muted">
                            on &quot;{comment.post.title}&quot;
                          </Text>
                          <Text>•</Text>
                          <Text size="sm" variant="muted">
                            c/{comment.post.SubForum.name}
                          </Text>
                        </div>
                        <Text className="text-right">
                          {comment.content}
                        </Text>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Text variant="muted" className="text-center">
                  No comments yet
                </Text>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80">
            <Card padding="md">
              <Text size="lg" weight="semibold" className="mb-4">
                User Stats
              </Text>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text size="sm">Posts</Text>
                  <Text size="sm" weight="medium">
                    {user.posts.length}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text size="sm">Comments</Text>
                  <Text size="sm" weight="medium">
                    {user.comments.length}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text size="sm">Total Karma</Text>
                  <Text size="sm" weight="medium">
                    {user.posts.reduce((sum, post) => sum + (post.upvotes - post.downvotes), 0)}
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Screen>
  );
}