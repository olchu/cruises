import { NextApiHandler } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { saveFile } from '@/shared/lib/serverUtils/saveFile';
import prisma from 'prisma/client';
import { getNextPageId } from '@/shared/lib/serverUtils/getNextPageId';

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
    const postImages = JSON.parse(formFields.images) || [];

    const response = await prisma.pages.update({
      where: { id: parseInt(formFields.id) },
      data: {
        title: formFields.title,
        slug: formFields.slug,
        content: formFields.content,
        active: 1,
        images: fileNames[0] || '',
        metaTag: JSON.parse(formFields.metaTag),
      },
    });

    res.json({ status: 'ok', post: response });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
