import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { useContext, useRef } from 'react';

export const InfoflotSchema = () => {
  const { cruise, freeCabins, ship } = useContext(CruiseContext);
  const schema = useRef(null);

  console.log('freeCabins', freeCabins);
  console.log('ship', ship?.scheme);

  const handleSvgInjected = (svg: any) => {
    if (svg) {
      schema.current = svg;
    }
  };

  if (freeCabins && schema.current) {
    for (const i in freeCabins) {
      fillRoom(freeCabins[i].roomId, schema.current);
    }
  }

  return (
    <div>
      {/* <ReactSVG src={'/api/svgProxy'} afterInjection={handleSvgInjected} /> */}
    </div>
  );
};

const fillRoom = (id: string, elem: HTMLElement) => {
  const room = elem.querySelector(`[data-cabin-id="${id}"]`);
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
