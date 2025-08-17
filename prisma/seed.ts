import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subForum.deleteMany({});

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'קוסם_קוד',
      email: 'coder@example.com',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'בונה_סאאס',
      email: 'saas@example.com',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      name: 'גורו_אתרים',
      email: 'webguru@example.com',
    },
  })

  // Create subforums
  const programming = await prisma.subForum.create({
    data: {
      name: 'תכנות',
    },
  })

  const entrepreneurship = await prisma.subForum.create({
    data: {
      name: 'יזמות',
    },
  })

  const webdev = await prisma.subForum.create({
    data: {
      name: 'פיתוח_אתרים',
    },
  })

  // Create posts
  await prisma.post.create({
    data: {
      title: 'מה השפת התכנות הכי אהובה עליכם ולמה?',
      content: 'אני לומד כבר כמה שפות תכנות ומעוניין לדעת מה הקהילה הכי אוהבת. כרגע אני חוקר את TypeScript ונהנה מאוד מהבטיחות הסוגים שהיא מספקת.',
      upvotes: 147,
      downvotes: 12,
      authorId: user1.id,
      subForumId: programming.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'השקתי את המוצר SaaS הראשון שלי! 🚀',
      content: 'אחרי 8 חודשים של פיתוח, סוף סוף השקתי את כלי ניהול הפרויקטים שלי. זה היה מסע מדהים ולמדתי הרבה על Next.js, Prisma ובניית מערכות לקנה מידה גדול.',
      upvotes: 892,
      downvotes: 34,
      authorId: user2.id,
      subForumId: entrepreneurship.id,
    },
  })

  await prisma.post.create({
    data: {
      title: 'העתיד של פיתוח אתרים ב-2025',
      content: 'עם כל הפריימוורקים והכלים החדשים שיוצאים, לאן לדעתכם פיתוח האתרים מתקדם? React Server Components, edge computing, אינטגרציה עם בינה מלאכותית...',
      upvotes: 234,
      downvotes: 18,
      authorId: user3.id,
      subForumId: webdev.id,
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })