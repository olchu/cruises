import { NextApiHandler } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { saveFile } from '@/shared/lib/serverUtils/saveFile';
import { getNextNewsId } from '@/shared/lib/serverUtils/getNextNewsId';
import prisma from 'prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/uploads', '/news'));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/uploads', '/news'));
  }
  const nextId = await getNextNewsId();
  const { fields, fileNames } = await saveFile(
    req,
    `news_${nextId}`,
    '/uploads/news',
    true
  );

  try {
    const formFields: Record<string, string> = {};

    for (let key in fields) {
      formFields[key] = fields?.[key]?.[0] || '';
    }

    const response = await prisma.news.create({
      data: {
        title: formFields.title,
        content: formFields.content,
        preview: formFields.preview,
        publish: formFields.publish,
        date: new Date(formFields.date),
        image: JSON.stringify(fileNames),
      },
    });

    res.json({ status: 'ok', post: response });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
