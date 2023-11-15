import prisma from 'prisma/client';

export const getNextBlogId = async () => {
  const blogs = await prisma.blog.findMany({
    select: { id: true },
    orderBy: { id: 'desc' },
    take: 1,
  });

  return blogs.length > 0 ? blogs[0].id + 1 : 1;
};
