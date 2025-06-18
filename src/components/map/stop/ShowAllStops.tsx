import BusStopView from "./BusStopView";
import stops_data from "@/data/stops_data.json";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getSeededColor(randomFn: () => number) {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(randomFn() * 16);
    color += letters[index];
  }
  return color;
}

const ShowAllStops = () => {
  const seed = 27;
  const rng = mulberry32(seed);

  return (
    <>
      {stops_data.map((stop) => {
        const randClr = getSeededColor(rng);
        return (
          <BusStopView
            key={stop.id}
            lineColor={randClr}
            stopName={stop.name}
            position={[stop.lat, stop.lng]}
          />
        );
      })}
    </>
  );
};

export default ShowAllStops;
