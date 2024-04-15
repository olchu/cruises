import { NextApiHandler } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { saveFile } from '@/shared/lib/serverUtils/saveFile';

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

  const { fileNames } = await saveFile(
    req,
    `pageImage`,
    '/uploads/pages',
    true
  );

  console.log('!!!!!!! fileNames', fileNames[0]);

  try {
    res.json({ status: 'ok', imageUrl: fileNames[0] });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
