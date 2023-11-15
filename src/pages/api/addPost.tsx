import { NextApiHandler } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { saveFile } from '@/shared/lib/serverUtils/saveFile';
import { getNextBlogId } from '@/shared/lib/serverUtils/getNextBlogId';
import prisma from 'prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/uploads', '/blog'));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/uploads', '/blog'));
  }
  const nextId = await getNextBlogId();
  const { fields, fileNames } = await saveFile(
    req,
    `post_${nextId}`,
    '/uploads/blog',
    true
  );

  try {
    const formFields: Record<string, string> = {};

    for (let key in fields) {
      formFields[key] = fields?.[key]?.[0] || '';
    }

    const response = await prisma.blog.create({
      data: {
        title: formFields.title,
        content: formFields.content,
        preview: formFields.preview,
        publish: formFields.publish,
        date: new Date(formFields.date),
        images: JSON.stringify(fileNames),
      },
    });

    res.json({ status: 'ok', post: response });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
