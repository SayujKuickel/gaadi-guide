import stops_data from "@/data/stops_data.json";
import { BusStopMarker } from "../ui";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getSeededColorFromHexId(hexId: string) {
  const seed = parseInt(hexId, 16);
  const rng = mulberry32(seed);
  const hueSteps = 12;
  const hue = Math.floor(rng() * hueSteps) * 30;
  const saturation = 40 + rng() * 20;
  const lightness = 35 + rng() * 10;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const AllStopsLayer: React.FC = () => {
  return (
    <>
      {stops_data.map((stop) => {
        const color = getSeededColorFromHexId(stop.id);

        return (
          <BusStopMarker
            key={stop.id}
            lineColor={color}
            stopName={stop.name}
            stopId={stop.id}
            position={[stop.lat, stop.lng]}
          />
        );
      })}
    </>
  );
};

export default AllStopsLayer;
