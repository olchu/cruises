import { VodohodCabinsResponse } from '@/shared/types/vodohod/vodohodCabins';
import { FreeCabinsType } from './useGetPrice';

const LOGIN = process.env.NEXT_PUBLIC_VODOHOD_LOGIN;
const PWD = process.env.NEXT_PUBLIC_VODOHOD_PWD;
const TOKEN_URL = 'https://api-crs.vodohod.com/security/authorise';

const getToken = async () => {
  try {
    const body = {
      login: LOGIN,
      password: PWD,
    };

    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data.result?.accessToken?.token;
  } catch (err) {
    console.log('Ошибка в получении токена');
  }
};

export const getPricesVodohod = async (id: number | undefined) => {
  const token = await getToken();

  try {
    const res = await fetch(
      `https://api-crs.vodohod.com/json/v3/cabins?id=${id}&limit=200`,
      {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { result }: VodohodCabinsResponse = await res.json();

    let obj: FreeCabinsType = {};
    let freeCabins: string[] = [];

    const cabinsRes = result?.data;
    for (const i in cabinsRes) {
      if (cabinsRes[i].availability) {
        const roomNumber = cabinsRes[i].number;
        freeCabins.push(roomNumber);
        const deckName = cabinsRes[i].deck.name;
        const typeName = cabinsRes[i].class.name;

        if (obj[deckName]) {
          if (obj[deckName][typeName]) {
            obj[deckName][typeName].push(roomNumber);
          } else obj[deckName][typeName] = [roomNumber];
        } else {
          obj[deckName] = { [typeName]: [roomNumber] };
        }
      }
    }

    return { cabins: obj, freeCabins };
  } catch (error) {
    return { cabins: {}, freeCabins: [] };
  }
};
