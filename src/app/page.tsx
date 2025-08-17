import {
  Screen,
  Container,
  PostCard,
  Header,
  Card,
  Text,
  Button,
} from "@/components";
import { getPosts } from "@/services";
import { PostWithData } from "@/types/database";

export default async function Home() {
  const posts: PostWithData[] = await getPosts();
  return (
    <Screen>
      <Header />

      <Container className="py-6">
        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1">
            {/* Sort Options */}
            <Card className="mb-4" padding="sm">
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm">
                  🔥 Hot
                </Button>
                <Button variant="ghost" size="sm">
                  🆕 New
                </Button>
                <Button variant="ghost" size="sm">
                  ⭐ Top
                </Button>
                <Button variant="ghost" size="sm">
                  📈 Rising
                </Button>
              </div>
            </Card>

            {/* Posts Feed */}
            <div>
              {posts.map((post: PostWithData) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80">
            {/* Popular Communities */}
            <Card padding="md" className="mb-4">
              <Text size="lg" weight="semibold" className="mb-4">
                Popular Communities
              </Text>
              <div className="space-y-3">
                {[
                  "programming",
                  "webdev",
                  "entrepreneur",
                  "javascript",
                  "react",
                ].map((community, index) => (
                  <div
                    key={community}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Text size="sm" weight="medium">
                        #{index + 1}
                      </Text>
                      <Text size="sm">c/{community}</Text>
                    </div>
                    <Button variant="ghost" size="sm">
                      Join
                    </Button>
                  </div>
                ))}
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
                  Create Community
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Screen>
  );
}
