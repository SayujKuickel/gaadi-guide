import { Link } from "react-router-dom";
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

function getSeededColorFromHexId(hexId: string) {
  const seed = parseInt(hexId, 16);
  const rng = mulberry32(seed);

  const hueSteps = 12;
  const hue = Math.floor(rng() * hueSteps) * 30;

  const saturation = 40 + rng() * 20;
  const lightness = 35 + rng() * 10;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const ShowAllStops = () => {
  return (
    <>
      {stops_data.map((stop) => {
        const color = getSeededColorFromHexId(stop.id);
        return (
          <BusStopView
            key={stop.id}
            lineColor={color}
            stopName={stop.name}
            position={[stop.lat, stop.lng]}
            popupContent={
              <>
                <Link
                  className="text-[12px] "
                  to={`/search?from=${stop.id}&stop=${stop.id}`}
                >
                  Start here
                </Link>{" "}
                <Link
                  className="text-[12px] "
                  to={`/search?to=${stop.id}&stop=${stop.id}`}
                >
                  Goto here
                </Link>
                <Link
                  className="text-[12px] block text-center"
                  to={`/stops?stop=${stop.id}`}
                >
                  Show Routes
                </Link>
              </>
            }
          />
        );
      })}
    </>
  );
};

export default ShowAllStops;
