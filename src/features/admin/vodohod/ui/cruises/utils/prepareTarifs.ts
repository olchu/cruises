import { Deck } from '@/features/admin/vodohod/api/getTarif';
import { DBPrice, DBTarif } from '@/shared/types/dbCruisesType';

export const prepareTarifs = (decks: Deck[]) => {
  let tarifs: DBTarif = {};
  let minPrice: null | number = null;
  let minPriceDiscont: null | number = null;

  decks.forEach((deck) => {
    deck.roomClasses.forEach((room) => {
      const tarif = room.tariffs.find(
        (t) =>
          t.meta_name === 'Тариф Взрослый' ||
          t.meta_name === 'Тариф Лайт Взрослый (завтрак)'
      );
      let price: DBPrice = {
        dicountedVal: null,
        val: null,
        annotation: room.annotation || '',
        description: room.description || '',
        thumbnails: room.thumbnails || [],
      };
      if (tarif) {
        tarif.accommodations.forEach((p) => {
          if (price?.dicountedVal) {
            if (price?.dicountedVal > p.price.discountedValue) {
              price.dicountedVal = p.price.discountedValue;
              price.val = p.price.value;
            }
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
