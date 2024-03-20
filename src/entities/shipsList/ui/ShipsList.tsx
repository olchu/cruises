import { colorsMaping } from '@/features/topMenu/config/colorsMaping';
import ships from '@/pages/ships';
import { ShipListProps } from '@/shared/types/shipList';
import { Text, Box } from '@chakra-ui/react';
import Link from 'next/link';

export const ShipsList = ({ ships }: ShipListProps) => {
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
      {Object.entries(ships)
        .sort()
        .map(([type, classes]) => {
          return (
            <>
              <Text
                _first={{ marginTop: 0 }}
                key={type}
                fontWeight="bold"
                fontSize="20px"
                mt="12px"
                color={colorsMaping[type]}
              >
                {type}
              </Text>
              {Object.entries(classes)
                .sort()
                .map(([classType, shipsOfClass]) => {
                  return (
                    <>
                      <Text
                        key={classType}
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
