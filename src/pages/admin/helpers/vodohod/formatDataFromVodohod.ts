import { CruiseList, CruiseListResponseData } from '../../api/types';

export const formatDataFromVodohod = (
  data: CruiseListResponseData[]
): CruiseList[] | null => {
  if (data?.length === 0) return null;

  return data.map((item) => {
    return {
      exId: `${item?.id}-v`,
      loadFrom: 'vodohod',
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      days: item.duration / 60 / 60 / 24,
      cityStart: item.cityStart.name,
      cityEnd: item.cityEnd.name,
      title: item.name,
      shortRoute: item.route.filter((i:any)=>i.name!=='День на борту').map((i: any) => i.name).join(' → '),
      route: JSON.stringify(item.route),
      shipId: item.motorship.id,
      shipName: item.motorship.name,
    };
  });
};
