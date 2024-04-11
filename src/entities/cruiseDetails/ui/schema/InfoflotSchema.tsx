import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { Button, HStack } from '@chakra-ui/react';
import { useContext, useMemo, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { SchemaProp } from './Schema';
import './style.css';

export const InfoflotSchema = ({
  chooseCabins,
  handleChoose,
  orderOpen,
}: SchemaProp) => {
  const { cruise, freeCabins, ship } = useContext(CruiseContext);
  const svgRef = useRef<SVGSVGElement | null>(null); // Добавляем ref для доступа к элементу SVG

  const { freeCabinsId, cabinsById, cabinsByNumber } = useMemo(() => {
    const freeCabinsId = freeCabins?.map((cabin) => cabin.roomId);
    const cabinsById: Record<string, string> = {};
    const cabinsByNumber: Record<string, string> = {};
    freeCabins?.forEach((cabin) => {
      cabinsById[cabin.roomId] = cabin.roomNumber;
      cabinsByNumber[cabin.roomNumber] = cabin.roomId;
    });
    return { freeCabinsId, cabinsById, cabinsByNumber };
  }, [freeCabins]);

  const handleBeforeInjected = (svg: SVGSVGElement) => {
    svgRef.current = svg;

    svg.querySelectorAll('g[data-cabin-id]').forEach((room) => {
      const roomId = room.getAttribute('data-cabin-id');

      // Определяем, свободна ли каюта и выбрана ли она
      const isFree = freeCabinsId?.includes(roomId || '');
      const isSelected = chooseCabins.includes(cabinsById[roomId || '']);
      const fillColor = isSelected ? '#165D9F' : '#e1f3fd';
      const textColor = isSelected ? 'white' : isFree ? 'text' : 'none';

      // Добавляем обработчик клика
      if (isFree) {
        room.classList.add('cabin');
        room.addEventListener('click', () =>
          handleChoose(cabinsById[roomId || ''])
        );
      }

      room
        .querySelector('.cabin_num')
        ?.setAttribute('style', `fill:${textColor}`);
      room
        .querySelector('.cabin_vacancies')
        ?.setAttribute('style', `fill:none`);

      room.querySelectorAll(`path.wall_cabin`).forEach((elem) => {
        elem.setAttribute('style', `fill:none`);
      });
      room.querySelectorAll(`.cabin`).forEach((elem) => {
        elem.setAttribute('style', `fill:${fillColor}!important`);
      });
    });
  };

  // useEffect(() => {
  //   return () => {
  //     if (svgRef.current) {
  //       const rooms = svgRef.current.querySelectorAll('g[data-cabin-id]');
  //       rooms.forEach((room) => {
  //         const roomId = room.getAttribute('data-cabin-id');
  //         const isFree = freeCabinsId?.includes(roomId || '');
  //         if (isFree)
  //           room.removeEventListener(
  //             'click',
  //             handleChoose(cabinsById[roomId || ''])
  //           );
  //       });
  //     }
  //   };
  // }, [cabinsById, freeCabinsId, handleChoose]);

  return (
    <>
      <ReactSVG
        src={ship?.scheme || ''}
        beforeInjection={handleBeforeInjected}
      />
      <HStack>
        <Button
          background="primary"
          color="white"
          onClick={orderOpen}
          mt="20px"
          mx="auto"
        >
          Оформить заявку
        </Button>
      </HStack>
    </>
  );
};
