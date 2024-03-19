export type ShipListProps = {
  ships: GroupedShips;
};

export type ShipsTypeSelect = {
  id: number;
  name: string;
  type: string | null;
  class: string | null;
};

export type GroupedShips = Record<string, Record<string, ShipsTypeSelect[]>>;
