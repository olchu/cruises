import { LinkItemType } from '../types/menuListType';
import { pagesLink } from './pagesLink';

export const menuList: LinkItemType[] = [
  {
    title: 'Круизы',
    link: pagesLink.russiaRiver,
    sub: [
      {
        title: 'Речные круизы',
        link: pagesLink.russiaRiver,
      },
      {
        title: 'Морские круизы',
        link: pagesLink.sea,
      },
      {
        title: 'Экспедиции',
        link: pagesLink.expedition,
      },
      {
        title: 'Круизы 2024',
        link: pagesLink.cruise2024,
      },
    ],
  },
  {
    title: 'Теплоходы',
    link: pagesLink.ships,
    sub: [],
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
