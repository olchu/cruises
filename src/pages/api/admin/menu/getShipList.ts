import { NextApiHandler } from 'next';
import { getShipsList } from '@/shared/api/getShipsList';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  try {
    const list = await getShipsList();

    res.json({ list });
  } catch (error) {
    res.status(500).json({ error: 'Внутренняя ошибка сервера.' });
  }
};

export default handler;
