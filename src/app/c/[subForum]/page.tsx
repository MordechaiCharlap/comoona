import {
  Screen,
  Container,
  PostCard,
  Header,
  Card,
  Text,
  Button,
} from "@/components";
import { getSubForumPosts } from "@/services";
import { PostWithData } from "@/types/database";

interface SubForumPageProps {
  params: Promise<{ subForum: string }>;
}

export default async function SubForumPage({ params }: SubForumPageProps) {
  const { subForum } = await params;
  const decodedSubForum = decodeURIComponent(subForum);
  const posts: PostWithData[] = await getSubForumPosts(decodedSubForum);

  return (
    <Screen>
      <Header />

      <Container className="py-6">
        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1">
            {/* SubForum Header */}
            <Card className="mb-4" padding="md">
              <Text size="xl" weight="bold" className="mb-2">
                c/{decodedSubForum}
              </Text>
              <Text size="sm" className="opacity-70">
                {posts.length} posts
              </Text>
            </Card>

            {/* Sort Options */}
            <Card className="mb-4" padding="sm">
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm">
                  Hot
                </Button>
                <Button variant="ghost" size="sm">
                  New
                </Button>
                <Button variant="ghost" size="sm">
                  Top
                </Button>
                <Button variant="ghost" size="sm">
                  Rising
                </Button>
              </div>
            </Card>

            {/* Posts Feed */}
            <div>
              {posts.length > 0 ? (
                posts.map((post: PostWithData) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card padding="lg" className="text-center">
                  <Text size="lg" className="mb-2">
                    No posts yet
                  </Text>
                  <Text size="sm" className="opacity-70">
                    Be the first to post in c/{decodedSubForum}
                  </Text>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80">
            {/* Community Info */}
            <Card padding="md" className="mb-4">
              <Text size="lg" weight="semibold" className="mb-4">
                About c/{decodedSubForum}
              </Text>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text size="sm">Posts</Text>
                  <Text size="sm" weight="medium">
                    {posts.length}
                  </Text>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card padding="md">
              <Text size="lg" weight="semibold" className="mb-4">
                Quick Actions
              </Text>
              <div className="space-y-2">
                <Button variant="primary" className="w-full">
                  Create Post
                </Button>
                <Button variant="secondary" className="w-full">
                  Join Community
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Screen>
  );
}