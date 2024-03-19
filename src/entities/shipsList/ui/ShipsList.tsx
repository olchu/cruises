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
                        opacity="0.8"
                        my="6px"
                      >
                        {classType}
                      </Text>
                      {shipsOfClass.map((ship) => (
                        <Text
                          key={ship.id}
                          fontSize="14px"
                          color="primary"
                          p="6px 4px"
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
