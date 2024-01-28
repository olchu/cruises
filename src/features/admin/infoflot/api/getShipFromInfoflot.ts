export const getShipFromInfoflot = async (id: number) => {
    const res = await fetch(
      `https://restapi.infoflot.com/ships/${id}?key=3388051f471303d332f11d2fde5d0697445b352d&limit=50`
    );
    const data = await res.json();
    return data;
  };