import { LinkItemType } from '../types/menuListType';
import { pagesLink } from './pagesLink';

export const menuList: LinkItemType[] = [
  {
    title: 'Круизы',
    link: pagesLink.home,
    sub: [
      {
        title: 'Речные круизы',
        link: pagesLink.home,
      },
      {
        title: 'Морские круизы',
        link: pagesLink.home,
      },
      {
        title: 'Экспедиции',
        link: pagesLink.home,
      },
      {
        title: 'Круизы 2024',
        link: pagesLink.home,
      },
    ],
  },
  {
    title: 'Теплоходы',
    link: pagesLink.ships,
  },
  {
    title: 'Направления',
    link: pagesLink.routes,
  },
  {
    title: 'Скидки',
    link: pagesLink.routes,
  },
  {
    title: 'Поиск',
    link: pagesLink.search,
  },
  {
    title: 'Информация',
    link: pagesLink.blog,
  },
  {
    title: 'О компании',
    link: pagesLink.contacts,
  },
];
