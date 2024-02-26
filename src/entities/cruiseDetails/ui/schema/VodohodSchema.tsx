import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { CruiseContext } from '@/pages/cruise/[cruiseId]';
import { Button, HStack } from '@chakra-ui/react';
import { SchemaProp } from './Schema';
import './style.css';

export const VodohodSchema = ({
  chooseCabins,
  handleChoose,
  orderOpen,
}: SchemaProp) => {
  const { cruise, freeCabins, ship } = useContext(CruiseContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleAfterInject = useCallback(
    (svg: SVGSVGElement) => {
      const freeCabinsNumber = freeCabins?.map((i) => i.roomNumber) || [];
      const deckElements = svg.querySelectorAll('[id^="Deck-"]');
      const newSvg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      let minX = Infinity,
        minY = Infinity,
        maxX = 0,
        maxY = 0;

      console.log('freefreeCabins', freeCabins);
      console.log('chooseCabins', chooseCabins);
      deckElements.forEach((deck) => {
        if (deck instanceof SVGGraphicsElement) {
          deck.setAttribute('style', `fill:#e1f3fd`);

          const clone = deck.cloneNode(true);
          newSvg.appendChild(clone);

          const cabins = deck.querySelectorAll('[id^="rf-"]');

          cabins.forEach((item) => {
            const number = item?.getAttribute('id')?.split('-')[1] || '';
            const isFree = freeCabinsNumber.includes(number);
            const isSelected = chooseCabins.includes(number);
            const fillColor = isSelected
              ? '#165D9F'
              : isFree
              ? '#61EA6F'
              : '#e1f3fd';
            item.setAttribute('style', `fill:${fillColor}`);
            if (isFree) {
              item.classList.add('cabin');
              item.addEventListener('click', () => handleChoose(number));
            }
          });

          const bbox = deck.getBBox();
          minX = Math.min(minX, bbox.x);
          minY = Math.min(minY, bbox.y);
          maxX = Math.max(maxX, bbox.x + bbox.width);
          maxY = Math.max(maxY, bbox.y + bbox.height);
        }
      });

      const width = maxX - minX;
      const height = maxY - minY;
      newSvg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height + 20}`);
      newSvg.setAttribute('width', '100%');
      newSvg.setAttribute('height', 'auto');

      if (containerRef.current && !svgRef.current) {
        svgRef.current = newSvg;
        containerRef.current.appendChild(newSvg);
        containerRef.current.removeChild(svg);
      }
    },
    [chooseCabins, freeCabins]
  );

  const handleBeforeInjection = (svg: SVGSVGElement) => {
    const freeCabinsNumber = freeCabins?.map((i) => i.roomNumber) || [];

    const cabinsText = svg.querySelectorAll('[id^="rn-"]');
    cabinsText.forEach((item) => {
      const number = item?.getAttribute('id')?.split('-')[1] || '';
      const isFree = freeCabinsNumber.includes(number);
      const isSelected = chooseCabins.includes(number);
      const fillColor = isFree ? 'text' : 'none';
      item.setAttribute('style', `fill:${fillColor}`);
      if (isSelected) {
        item.setAttribute('style', `fill:white`);
      }
      if (isFree) {
        item.classList.add('cabin');
        item.addEventListener('click', () => handleChoose(number));
      }
     
    });

    const cabinsFill = svg.querySelectorAll('[id^="rf-"]');
    cabinsFill.forEach((item) => {
      const number = item?.getAttribute('id')?.split('-')[1] || '';
      const isSelected = chooseCabins.includes(number);
      const isFree = freeCabinsNumber.includes(number);
      if (isFree) {
        item.classList.add('cabin');
        item.addEventListener('click', () => handleChoose(number));
      }
      if (isSelected) {
        item.setAttribute('style', `fill:#165D9F`);
      }
    });

    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');
  };

  return (
    <>
      <div ref={containerRef}>
        <ReactSVG
          src={ship?.scheme || ''}
          // afterInjection={handleAfterInject}
          beforeInjection={handleBeforeInjection}
        />
      </div>
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
