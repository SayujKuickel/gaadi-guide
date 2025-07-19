import "leaflet/dist/leaflet.css";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import TileLayerView from "@/components/map/views/TileLayerView";
import { DEFAULT_ZOOM, MAP_CENTER } from "@/constants/mapConfigs";
import { LatLng } from "leaflet";
import { useState, useRef } from "react";
import {
  MapContainer,
  Polyline,
  useMapEvents,
  CircleMarker,
  Popup,
} from "react-leaflet";
import stops_data from "@/data/stops_data.json";
import type { IStop } from "@/types/stop.types";
import BusStopMarker from "@/components/map/markers/BusStopMarker";
import { ChevronDown, ChevronUp, Trash2Icon } from "lucide-react";

interface Errors {
  routeName?: string;
  routeColor?: string;
  stops?: string;
}

const MapClickHandler = ({
  onMapClick,
}: {
  onMapClick: (latlng: LatLng) => void;
}) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const generateHexId = (lat: number, lng: number): string => {
  const combined = Math.abs(lat * 1000000) + Math.abs(lng * 1000000);
  return Math.floor(combined).toString(16).slice(-6).padStart(6, "0");
};

const generateRouteId = (stops: IStop[]): string => {
  if (stops.length === 0) return "";
  if (stops.length === 1) return stops[0].id;
  return `${stops[0].id}-${stops[stops.length - 1].id}`;
};

const AddNewRoutePage = () => {
  const [stopsData, setStopsData] = useState<IStop[]>(stops_data as IStop[]);
  const [routeData, setRouteData] = useState({
    routeName: "",
    routeColor: "#3B82F6",
  });
  const [selectedStop, setSelectedStop] = useState<IStop | null>(null);
  const [stops, setStops] = useState<IStop[]>([]);
  const [customStops, setCustomStops] = useState<IStop[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const mapRef = useRef<L.Map | null>(null);

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRouteData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleMapClick = (latlng: LatLng) => {
    const stopName = prompt("Enter stop name:");
    if (!stopName || !stopName.trim()) {
      return;
    }

    const generatedId = generateHexId(latlng.lat, latlng.lng);
    const newStopData: IStop = {
      id: `new-${generatedId}`,
      name: stopName.trim(),
      lat: latlng.lat,
      lng: latlng.lng,
    };

    setCustomStops((prev) => [...prev, newStopData]);
    setStopsData((prev) => [newStopData, ...prev]);
    setStops((prev) => [...prev, newStopData]);
    setErrors((prev) => ({ ...prev, stops: undefined }));
  };

  const handleAddStopFromMap = (stop: IStop, e: React.MouseEvent) => {
    e.stopPropagation();
    if (stops.some((s) => s.id === stop.id)) {
      alert("This stop is already added to the route!");
      return;
    }
    setStops((prev) => [...prev, stop]);
    setErrors((prev) => ({ ...prev, stops: undefined }));
  };

  const handleStopSelection = (stop: IStop | null) => {
    if (!stop) {
      setSelectedStop(null);
      return;
    }

    if (stops.some((s) => s.id === stop.id)) {
      setErrors((prev) => ({ ...prev, stops: "This stop is already added." }));
      setSelectedStop(null);
      return;
    }

    setStops((prev) => [...prev, stop]);
    setSelectedStop(null);
    setErrors((prev) => ({ ...prev, stops: undefined }));
  };

  const handleDeleteStop = (stopId: string) => {
    setStops((prev) => prev.filter((stop) => stop.id !== stopId));
  };

  const handleMoveStop = (index: number, direction: "up" | "down") => {
    const newStops = [...stops];
    if (direction === "up" && index > 0) {
      [newStops[index - 1], newStops[index]] = [
        newStops[index],
        newStops[index - 1],
      ];
    } else if (direction === "down" && index < newStops.length - 1) {
      [newStops[index], newStops[index + 1]] = [
        newStops[index + 1],
        newStops[index],
      ];
    }
    setStops(newStops);
  };

  const handleSubmit = () => {
    const newErrors: Errors = {};
    if (!routeData.routeName.trim()) {
      newErrors.routeName = "Route name is required.";
    }
    if (!routeData.routeColor) {
      newErrors.routeColor = "Route color is required.";
    }
    if (stops.length === 0) {
      newErrors.stops = "At least one stop is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const routeId = generateRouteId(stops);
    const route = {
      id: routeId,
      ...routeData,
      stops,
    };

    const jsonString = JSON.stringify(route, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${route.routeName || "route"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setRouteData({ routeName: "", routeColor: "#3B82F6" });
    setStops([]);
    setSelectedStop(null);
    setErrors({});
  };

  const handleClearRoute = () => {
    if (
      stops.length > 0 &&
      !confirm("Are you sure you want to clear all stops?")
    ) {
      return;
    }
    setStops([]);
    setErrors((prev) => ({ ...prev, stops: undefined }));
  };

  return (
    <>
      <div className="block md:hidden grid place-items-center h-screen">
        <div className="text-center">
          <Heading level={1}>Please View this page in desktop</Heading>
          <p>This Page is not made for mobile view</p>
        </div>
      </div>
      <div className="hidden md:block h-screen md:flex">
        <div className="w-1/5 bg-surface-1 border-r border-surface-3 flex flex-col">
          <div className="p-4 border-b border-surface-3">
            <Heading level={4} className="mb-4">
              Route Details
            </Heading>
            <div className="mb-3">
              <label
                htmlFor="routeName"
                className="block text-sm font-medium mb-1"
              >
                Route Name
              </label>
              <input
                id="routeName"
                type="text"
                name="routeName"
                value={routeData.routeName}
                onChange={handleRouteChange}
                placeholder="Enter route name"
                className="w-full p-2 text-sm outline-none rounded bg-surface-3 focus:ring-2 focus:ring-blue-500"
              />
              {errors.routeName && (
                <p className="text-red-500 text-xs mt-1">{errors.routeName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="routeColor"
                className="block text-sm font-medium mb-1"
              >
                Route Color
              </label>
              <input
                id="routeColor"
                type="color"
                name="routeColor"
                value={routeData.routeColor}
                onChange={handleRouteChange}
                className="w-full h-10 outline-none rounded bg-surface-3 cursor-pointer"
              />
              {errors.routeColor && (
                <p className="text-red-500 text-xs mt-1">{errors.routeColor}</p>
              )}
            </div>
          </div>

          <div className="p-4 border-b border-surface-3">
            <Heading level={5} className="mb-3">
              Add Stops
            </Heading>
            <SearchableCombobox
              label=""
              selected={selectedStop}
              onChange={handleStopSelection}
              options={[...stopsData, ...customStops]}
              placeholder="Search existing stops..."
              className="mb-2"
            />
            {errors.stops && (
              <p className="text-red-500 text-xs mt-1">{errors.stops}</p>
            )}
            <p className="text-xs text-gray-600 mt-2">
              Or click on the map to add a new stop
            </p>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-surface-3">
              <div className="flex items-center justify-between mb-2">
                <Heading level={5}>Stops ({stops.length})</Heading>
                {stops.length > 0 && (
                  <button
                    onClick={handleClearRoute}
                    className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {stops.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No stops added yet
                </p>
              ) : (
                <ul className="space-y-2">
                  {stops.map((stop, index) => (
                    <li
                      key={stop.id}
                      className="bg-surface-2 rounded p-2 text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center min-w-0 flex-1">
                          <span className="w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-2 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="font-medium truncate">
                            {stop.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 truncate">
                          {stop.id}
                        </p>
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => handleMoveStop(index, "up")}
                            disabled={index === 0}
                            className="p-1 hover:bg-surface-3 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            <ChevronUp size={12} />
                          </button>
                          <button
                            onClick={() => handleMoveStop(index, "down")}
                            disabled={index === stops.length - 1}
                            className="p-1 hover:bg-surface-3 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            <ChevronDown size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteStop(stop.id)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded"
                            title="Remove stop"
                          >
                            <Trash2Icon size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-surface-3 space-y-2">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
            >
              Save Route
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <MapContainer
            center={MAP_CENTER}
            zoom={DEFAULT_ZOOM}
            zoomControl={true}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayerView tileMapKey="openstreetmap" />

            {[...stopsData, ...customStops].map((stop) => {
              const isInRoute = stops.some((s) => s.id === stop.id);
              return (
                <CircleMarker
                  key={`available-${stop.id}`}
                  center={[stop.lat, stop.lng]}
                  radius={isInRoute ? 6 : 8}
                  fillColor={isInRoute ? routeData.routeColor : "#170D7C"}
                  color={isInRoute ? routeData.routeColor : "#170D7C"}
                  weight={2}
                  opacity={0.9}
                  fillOpacity={isInRoute ? 0.8 : 0.6}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <h3 className="font-semibold text-sm mb-2">
                        {stop.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        ID: {stop.id}
                      </p>

                      {isInRoute ? (
                        <p className="text-xs text-green-600 font-medium">
                          ✓ Already in route
                        </p>
                      ) : (
                        <button
                          onClick={(e) => handleAddStopFromMap(stop, e)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                        >
                          Add to Route
                        </button>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {stops.map((stop, index) => (
              <BusStopMarker
                showDetailedPopup={true}
                key={`route-${stop.id}`}
                position={[stop.lat, stop.lng]}
                stopName={`${index + 1}. ${stop.name}`}
                lineColor={routeData.routeColor}
              />
            ))}

            {stops.length > 1 && (
              <Polyline
                positions={stops.map((stop) => [stop.lat, stop.lng])}
                color={routeData.routeColor}
                weight={4}
                opacity={0.8}
              />
            )}

            <MapClickHandler onMapClick={handleMapClick} />
          </MapContainer>

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Click green circles</strong> to add existing stops to your
              route
            </p>
            <p className="text-sm text-gray-700">
              <strong>Click empty areas</strong> to create new stops
            </p>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Available stops</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">In route</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewRoutePage;
