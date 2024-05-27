import { NextApiHandler } from 'next';
import xml2js from 'xml-js';

const GAMA_KEY = process.env.NEXT_PUBLIC_GAMA_KEY;

const handler: NextApiHandler = async (req, res) => {
  const { query } = req;
  const shipId = query.shipId;

  try {
    const shipsRes = await fetch(
      'https://gama-nn.ru/satellite/xml/dir-generic?key=' + GAMA_KEY
    );

    const shipsXml = await shipsRes.text();

    const shipsJson = JSON.parse(xml2js.xml2json(shipsXml));
    const categoryList = shipsJson?.elements[0]?.elements.find(
      (r: any) => r.name === 'CategoryList'
    );

    const cabinDescriptionList = shipsJson?.elements[0]?.elements.find(
      (r: any) => r.name === 'CabinDescriptionList'
    );
    const description: Record<
      string,
      {
        name: string;
        description: string;
        images?: string[];
      }
    > = {};
    cabinDescriptionList.elements.forEach((item: any) => {
      const { id, name, desc } = item.attributes;
      const images = item.elements[0].elements?.map((img: any) => {
        return `https://gama-nn.ru/${img?.attributes?.href}`;
      });
      description[id] = { name, description: desc, images };
    });

    const shipList = shipsJson?.elements[0]?.elements.find(
      (r: any) => r.name === 'ShipList'
    );
    const currentShip = shipList?.elements.find(
      (r: any) => r.attributes.id === shipId
    );

    const deks: any = {};
    const newdeck: any = {};

    const shipDeks = currentShip?.elements[1]?.elements;
    shipDeks.forEach((deck: any) => {
      const deckId = deck?.attributes?.id;
      const deckName = deck?.attributes?.name;
      const cabins =
        deck?.elements?.[0]?.elements?.map((cabin: any) => {
          const { id, cabin_description_id, name } = cabin?.attributes;
          newdeck[name] = {
            cabin_description_id,
            cabinId: id,
            deckId,
            deckName,
          };
          return { name, id, descId: cabin_description_id };
        }) || [];
      deks[deckName] = cabins;
    });

    return res.status(200).json({ description, deks, newdeck });
    // return res.status(200).json(categoryList?.elements);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
