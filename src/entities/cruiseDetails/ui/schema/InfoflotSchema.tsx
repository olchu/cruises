import { useRef } from 'react';
import { ReactSVG } from 'react-svg';

type InfoflotSchemaProp = {
  prices: any;
  url: string;
};



export const InfoflotSchema = ({ prices, url }: InfoflotSchemaProp) => {
  const schema = useRef(null);

  const handleSvgInjected = (svg: any) => {
    if (svg) {
      schema.current = svg;
    }
  };

  if (prices && schema.current) {
    for (const i in prices) {
      fillRoom(prices[i].id, schema.current);
    }
  }

  return (
    <div>
      <ReactSVG src={'/api/svgProxy'} afterInjection={handleSvgInjected} />
    </div>
  );
};

const fillRoom = (id: number, elem: HTMLElement) => {
  const room = elem.querySelector('[data-cabin-id="25180"]');
  const roomText = elem.querySelector(
    '[data-cabin-id="25180"]>[class="cabin_num"]'
  );
  if (room) {
    // console.log('room', room);
    room.style.fill = 'green';
  }
  if (roomText) {
    // console.log('roomText', roomText);
    room.removeChild(roomText);
  }
};
