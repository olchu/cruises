import { Deck } from '@/components/vodohod/api/useGetTarifs';

type Price = {
  dicountedVal: null | number;
  val: null | number;
};

type Class = Record<string, Price>;
type Tarif = Record<string, Class>;

export const prepareTarifs = (decks: Deck[]) => {
  let tarifs: Tarif = {};

  decks.forEach((deck) => {
    deck.roomClasses.forEach((room) => {
      const tarif = room.tariffs.find((t) => t.meta_name === 'Тариф Взрослый');
      let price: Price = {
        dicountedVal: null,
        val: null,
      };
      if (tarif) {
        tarif.accommodations.forEach((p) => {
          if (price?.dicountedVal) {
            if (price?.dicountedVal > p.price.discountedValue)
              price.dicountedVal = p.price.discountedValue;
            price.val = p.price.value;
          } else {
            price.dicountedVal = p.price.discountedValue;
            price.val = p.price.value;
          }
        });
      }
      const tmpRooms = { ...tarifs[deck.name] };
      const tmpRoomPrices = { ...tmpRooms[room.name] };

      tarifs[deck.name] = { ...tmpRooms, [room.name]: price };
    });
  });
  return tarifs;
};
