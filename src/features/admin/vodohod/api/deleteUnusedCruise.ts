export const deleteUnusedCruise = async () => {
  const res = await fetch('/api/vodohod/delOldCruises');
  const data = await res.json();
  return data.count;
};
