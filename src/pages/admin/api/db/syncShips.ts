// import prisma from 'prisma/client';
import { CruiseList } from '../types';

export const syncShips = async (cruises: CruiseList[]) => {
  if (cruises.length === 0) return;

  const res = await fetch('/api/syncShips', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cruises: cruises }),
  });

  if (!res.ok) {
    return new Error('Не получилось синхронизировать круизы');
  }

  return res;
};
