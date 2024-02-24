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
    await fs.readdir(path.join(process.cwd() + '/uploads', '/schemes'));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/uploads', '/schemes'));
  }

  const { fileNames } = await saveFile(
    req,
    `ship_${req.body.shipId}`,
    '/uploads/schemes',
    true
  );

  try {
    res.json({ status: 'ok', fileNames: JSON.stringify(fileNames) });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
