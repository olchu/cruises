import { NextApiHandler } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { saveFile } from '@/shared/lib/serverUtils/saveFile';
import prisma from 'prisma/client';
import { getNextPageId } from '@/shared/lib/serverUtils/getNextPageId';
import { defaultItemsOnPage } from '@/shared/constants/constants';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/uploads', '/pages'));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/uploads', '/pages'));
  }

  const nextId = await getNextPageId();
  const { fields, fileNames } = await saveFile(
    req,
    `pages_${nextId - 1}`,
    '/uploads/pages',
    true
  );

  try {
    const formFields: Record<string, string> = {};

    for (let key in fields) {
      formFields[key] = fields?.[key]?.[0] || '';
    }

    console.log('formFields.metaTag', formFields.query);

    const response = await prisma.pages.update({
      where: { id: parseInt(formFields.id) },
      data: {
        title: formFields.title,
        slug: formFields.slug,
        content: formFields.content,
        active: formFields.active === 'true' ? 1 : 0,
        images: fileNames[0] || '',
        metaTag: JSON.parse(formFields.metaTag), // TODO пока не используется. не знаю нужен ли будет
        query: JSON.parse(formFields.query),
        seoTitle: formFields.seoTitle,
        seoDescription: formFields.seoDescription,
        seoKeywords: formFields.seoKeywords,
        seoCanonicalUrl: formFields.seoCanonicalUrl,
        itemsOnPage: Number(formFields.itemsOnPage) || defaultItemsOnPage,
      },
    });

    res.json({ status: 'ok', post: response });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
