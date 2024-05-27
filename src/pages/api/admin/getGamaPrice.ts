import { NextApiHandler } from 'next';
import xml2js from 'xml-js';

const GAMA_KEY = process.env.NEXT_PUBLIC_GAMA_KEY;

const handler: NextApiHandler = async (req, res) => {
  const { query } = req;
  const routeId = query.routeId;
  try {
    const pricesRes = await fetch(
      `https://gama-nn.ru/satellite/route/${routeId}/?all=1&key=` + GAMA_KEY
    );

    const pricesXml = await pricesRes.text();

    const pricesJson = JSON.parse(xml2js.xml2json(pricesXml));
    const price = pricesJson?.elements[0]?.elements[1]?.elements[0]?.elements;

    return res.status(200).json(price);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
