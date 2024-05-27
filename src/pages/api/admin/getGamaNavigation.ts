import { NextApiHandler } from 'next';
import xml2js from 'xml-js';

const GAMA_KEY = process.env.NEXT_PUBLIC_GAMA_KEY;

const handler: NextApiHandler = async (req, res) => {
  const { query } = req;
  const shipId = query.shipId;
  try {
    const routesRes = await fetch(
      'https://gama-nn.ru/satellite/xml/navigation/?key=' + GAMA_KEY
    );

    const routesXml = await routesRes.text();

    const routesJson = JSON.parse(xml2js.xml2json(routesXml));
    const navigationList = routesJson?.elements[0]?.elements.find(
      (r: any) => r.name === 'NavigationList'
    );

    const routesByShip = navigationList?.elements.find(
      (r: any) => r.attributes.ship_id === shipId
    );

    return res.status(200).json(routesByShip);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
