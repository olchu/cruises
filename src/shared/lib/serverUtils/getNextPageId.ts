import prisma from 'prisma/client';

export const getNextPageId = async () => {
  const pages = await prisma.pages.findMany({
    select: { id: true },
    orderBy: { id: 'desc' },
    take: 1,
  });

  return pages.length > 0 ? pages[0].id + 1 : 1;
};
