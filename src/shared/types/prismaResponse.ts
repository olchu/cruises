import Prisma from '@prisma/client';

export type CruiseType = Prisma.cruises;
export type ShipsType = Prisma.ships;
export type PostsType = Prisma.blog; //TODO переименовать типы
export type PagesPrismaType = Prisma.pages;
export type HeroPrismaType = Prisma.hero;
export type NewsPrismaType = Prisma.news;

export type TagPrismaType = {
  key: {
    name: string;
    val: string;
  };
  content: string;
};
