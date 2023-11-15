import { Deck } from '@/features/admin/vodohod/api/getTarif';

type Price = {
  dicountedVal: null | number;
  val: null | number;
};

type Class = Record<string, Price>;
export type Tarif = Record<string, Class>;

export const prepareTarifs = (decks: Deck[]) => {
  let tarifs: Tarif = {};
  let minPrice: null | number = null;
  let minPriceDiscont: null | number = null;

  decks.forEach((deck) => {
    deck.roomClasses.forEach((room) => {
      const tarif = room.tariffs.find(
        (t) =>
          t.meta_name === 'Тариф Взрослый' ||
          t.meta_name === 'Тариф Лайт Взрослый (завтрак)'
      );
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
          if (!minPrice || minPrice > p.price.value) {
            minPrice = p.price.value;
            minPriceDiscont = p.price.discountedValue;
          }
        });
      }
      const tmpRooms = { ...tarifs[deck.name] };

      tarifs[deck.name] = { ...tmpRooms, [room.name]: price };
    });
  });
  return { tarifs, minimum: { minPrice, minPriceDiscont } };
};
