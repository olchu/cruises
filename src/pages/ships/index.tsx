import { MainLayout } from '@/layouts/main';
import { MainContainer } from '@/shared/ui/mainContainer/MainContainer';
import { Text, Box, Grid, Flex, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import prisma from 'prisma/client';
import { ReactElement } from 'react';

type ShipListProps = {
  ships: GroupedShips;
};

type ShipsTypeSelect = {
  id: number;
  name: string;
  type: string | null;
  class: string | null;
};

type GroupedShips = Record<string, Record<string, ShipsTypeSelect[]>>;

const ShipsList = ({ ships }: ShipListProps) => {
  console.log('ships', ships);

  return (
    <MainContainer
      px={{ base: 'section.mobile', lg: 'section.desktop' }}
      py={{ base: 'section.mobile', lg: 'section.desktop' }}
    >
      <Box
        flexWrap="wrap"
        columnGap="20px"
        minHeight="500px"
        width="100%"
        sx={{
          columnWidth: {base:'100%',md:'200px'},
        }}
      >
        {Object.entries(ships)
          .sort()
          .map(([type, classes]) => {
            return (
              <>
                <Text _first={{marginTop:0}} key={type} fontWeight="bold" fontSize="20px" mt="12px">
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
    </MainContainer>
  );
};

ShipsList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShipsList;

export const getServerSideProps: GetServerSideProps<
  ShipListProps
> = async () => {
  const allShips: ShipsTypeSelect[] = await prisma.ships.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      class: true,
    },
    where: {
      active: 1,
    },
  });

  const groupedShips: GroupedShips = {};

  allShips.forEach((ship) => {
    if (ship.type === null || ship.class === null) return;
    if (!groupedShips[ship.type]) {
      groupedShips[ship.type] = {};
    }
    if (!groupedShips[ship.type][ship.class]) {
      groupedShips[ship.type][ship.class] = [];
    }

    groupedShips[ship.type][ship.class].push(ship);
  });

  return { props: { ships: groupedShips } };
};
