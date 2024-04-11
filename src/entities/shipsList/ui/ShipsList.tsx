'use client';

import { colorsMaping } from '@/features/topMenu/config/colorsMaping';
import { GroupedShips } from '@/shared/types/shipList';
import { Text, Box } from '@chakra-ui/react';
import Link from 'next/link';

export const ShipsList = ({ ships }: { ships: GroupedShips | null }) => {
  return (
    <Box
      flexWrap="wrap"
      columnGap="20px"
      minHeight="300px"
      width="100%"
      sx={{
        columnWidth: { base: 'inherit', md: '200px' },
      }}
    >
      {ships &&
        Object.entries(ships) // TODO add memo
          .sort()
          .map(([type, classes], index) => {
            return (
              <>
                <Text
                  _first={{ marginTop: 0 }}
                  key={`${type}-${index}`}
                  fontWeight="bold"
                  fontSize="20px"
                  mt="12px"
                  color={colorsMaping[type]}
                >
                  {type}
                </Text>
                {Object.entries(classes)
                  .sort()
                  .map(([classType, shipsOfClass], index) => {
                    return (
                      <>
                        <Text
                          key={`${classType}-${index}`}
                          fontWeight="bold"
                          fontSize="16px"
                          opacity="0.7"
                          my="6px"
                          color={colorsMaping[type]}
                        >
                          {classType}
                        </Text>
                        {shipsOfClass
                          .sort((p, n) => {
                            return p.name >= n.name ? 1 : -1;
                          })
                          .map((ship) => (
                            <Text
                              key={ship.id}
                              fontSize="14px"
                              p="6px 4px"
                              color={colorsMaping[type]}
                            >
                              <Link href={`/ship/${ship.id}`}>{ship.name}</Link>
                            </Text>
                          ))}
                      </>
                    );
                  })}
              </>
            );
          })}
    </Box>
  );
};
