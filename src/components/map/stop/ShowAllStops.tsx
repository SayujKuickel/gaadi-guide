import { Link } from "react-router-dom";
import BusStopView from "./BusStopView";
import stops_data from "@/data/stops_data.json";
import Heading from "@/components/common/Heading";

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
            position={[stop.lat, stop.lng]}
            popupContent={
              <>
                <div className="w-[175px] ">
                  <h4 className="text-center text-lg font-semibold leading-tight">
                    {stop.name}
                  </h4>
                  <hr className="text-offText mt-1 mb-3" />

                  <div className="grid grid-cols-2 gap-1">
                    <Link
                      style={{ color: "white" }}
                      className="flex-1 block bg-sa-blue/80 hover:bg-sa-blue transition-all text-sm leading-tight text-center p-2 rounded-lg"
                      to={`/search?from=${stop.id}&stop=${stop.id}`}
                    >
                      Start Here
                    </Link>
                    <Link
                      style={{ color: "white" }}
                      className="flex-1 block bg-sa-blue/80 hover:bg-sa-blue transition-all text-sm leading-tight text-center p-2 rounded-lg"
                      to={`/search?to=${stop.id}&stop=${stop.id}`}
                    >
                      Goto Here
                    </Link>
                    <Link
                      style={{ color: "white" }}
                      className="flex-1 col-span-2 block bg-sa-blue/80 hover:bg-sa-blue transition-all text-sm leading-tight text-center p-2 rounded-lg"
                      to={`/stops?stop=${stop.id}`}
                    >
                      View Routes
                    </Link>
                  </div>
                </div>
              </>
            }
          />
        );
      })}
    </>
  );
};

export default ShowAllStops;
