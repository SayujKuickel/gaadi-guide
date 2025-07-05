import "leaflet/dist/leaflet.css";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import TileLayerView from "@/components/map/views/TileLayerView";
import { DEFAULT_ZOOM, MAP_CENTER } from "@/constants/siteConfigs";
import ContainerLayout from "@/layout/ContainerLayout";
import { LatLng } from "leaflet";
import { useState, useRef } from "react";
import { MapContainer, Polyline, useMapEvents } from "react-leaflet";
import stops_data from "@/data/stops_data.json";
import type { IStop } from "@/types/stop.types";
import BusStopMarker from "@/components/map/markers/BusStopMarker";

interface Errors {
  routeName?: string;
  routeColor?: string;
  stops?: string;
  newStopName?: string;
  newStopLat?: string;
  newStopLng?: string;
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
    routeColor: "#000000",
  });
  const [selectedStop, setSelectedStop] = useState<IStop | null>(null);
  const [stops, setStops] = useState<IStop[]>([]);
  const [customStops, setCustomStops] = useState<IStop[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isNewStopFormShown, setIsNewStopFormShown] = useState<boolean>(false);
  const [newStop, setNewStop] = useState<Partial<IStop>>({
    name: "",
    lat: undefined,
    lng: undefined,
  });
  const [tempMarkerPos, setTempMarkerPos] = useState<LatLng | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const popupMapRef = useRef<L.Map | null>(null);

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRouteData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleNewStopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStop((prev) => ({
      ...prev,
      [name]:
        name === "lat" || name === "lng"
          ? value
            ? Number(value)
            : undefined
          : value,
    }));
    if (name === "lat" || name === "lng") {
      const lat = name === "lat" ? Number(value) : newStop.lat;
      const lng = name === "lng" ? Number(value) : newStop.lng;
      if (lat !== undefined && lng !== undefined) {
        setTempMarkerPos(new LatLng(lat, lng));
      }
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleMapClick = (latlng: LatLng) => {
    setNewStop((prev) => ({
      ...prev,
      lat: latlng.lat,
      lng: latlng.lng,
    }));
    setTempMarkerPos(latlng);
    setErrors((prev) => ({
      ...prev,
      newStopLat: undefined,
      newStopLng: undefined,
    }));
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

  const handleAddStop = () => {
    const newErrors: Errors = {};

    if (!newStop.name?.trim()) {
      newErrors.newStopName = "Stop name is required.";
    }
    if (
      newStop.lat === undefined ||
      isNaN(newStop.lat) ||
      newStop.lat < -90 ||
      newStop.lat > 90
    ) {
      newErrors.newStopLat = "Valid latitude (-90 to 90) is required.";
    }
    if (
      newStop.lng === undefined ||
      isNaN(newStop.lng) ||
      newStop.lng < -180 ||
      newStop.lng > 180
    ) {
      newErrors.newStopLng = "Valid longitude (-180 to 180) is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const generatedId = generateHexId(newStop.lat!, newStop.lng!);

    const newStopData: IStop = {
      id: `new-${generatedId}`,
      name: newStop.name!,
      lat: newStop.lat!,
      lng: newStop.lng!,
    };

    setCustomStops((prev) => [...prev, newStopData]);
    setStopsData((prev) => [newStopData, ...prev]);

    setStops((prev) => [...prev, newStopData]);

    setNewStop({ name: "", lat: undefined, lng: undefined });
    setTempMarkerPos(null);
    setIsNewStopFormShown(false);
    setErrors({});
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

    setRouteData({ routeName: "", routeColor: "#000000" });
    setStops([]);
    setSelectedStop(null);
    setErrors({});
  };

  const closeNewStopForm = () => {
    setIsNewStopFormShown(false);
    setNewStop({ name: "", lat: undefined, lng: undefined });
    setTempMarkerPos(null);
    setErrors({});
  };

  if (!stopsData || stopsData.length === 0) {
    return (
      <ContainerLayout isCenter={true} size="sm">
        <section className="space-y-4">
          <Heading level={3}>Add Route</Heading>
          <p className="text-red-500">
            No stops available. Please add a new stop.
          </p>
          <form className="p-4 bg-background rounded-lg space-y-4">
            <Heading level={2} className="mb-4">
              Add New Stop
            </Heading>
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newStop.name || ""}
                onChange={handleNewStopChange}
                className="w-full p-2 outline-none rounded bg-surface-3"
                placeholder="Enter stop name"
              />
              {errors.newStopName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newStopName}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lat" className="block text-sm font-medium">
                Latitude
              </label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={newStop.lat !== undefined ? newStop.lat : ""}
                onChange={handleNewStopChange}
                className="w-full p-2 outline-none rounded bg-surface-3"
                placeholder="Click map to select latitude"
                step="any"
              />
              {errors.newStopLat && (
                <p className="text-red-500 text-sm mt-1">{errors.newStopLat}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lng" className="block text-sm font-medium">
                Longitude
              </label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={newStop.lng !== undefined ? newStop.lng : ""}
                onChange={handleNewStopChange}
                className="w-full p-2 outline-none rounded bg-surface-3"
                placeholder="Click map to select longitude"
                step="any"
              />
              {errors.newStopLng && (
                <p className="text-red-500 text-sm mt-1">{errors.newStopLng}</p>
              )}
            </div>
            <div className="h-[300px] mb-3">
              <MapContainer
                center={MAP_CENTER}
                zoom={DEFAULT_ZOOM}
                zoomControl={false}
                className="h-full w-full"
                ref={mapRef}
              >
                <TileLayerView tileMapKey="openstreetmap" />
                {tempMarkerPos && (
                  <BusStopMarker
                    showDetailedPopup={false}
                    position={[tempMarkerPos.lat, tempMarkerPos.lng]}
                    stopName={newStop.name || "New Stop"}
                    lineColor="#5F05B1"
                  />
                )}
                <MapClickHandler onMapClick={handleMapClick} />
              </MapContainer>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddStop}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                Save Stop
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewStop({ name: "", lat: undefined, lng: undefined });
                  setTempMarkerPos(null);
                  setErrors({});
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Clear
              </button>
            </div>
          </form>
        </section>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout
      className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12 mb-32"
      isCenter={true}
      size="sm"
    >
      <section className="space-y-4">
        <Heading level={3}>Add Route</Heading>
        <div>
          <label htmlFor="routeName" className="block text-sm font-medium">
            Route Name
          </label>
          <input
            id="routeName"
            type="text"
            name="routeName"
            value={routeData.routeName}
            onChange={handleRouteChange}
            placeholder="Enter route name"
            className="w-full p-2 outline-none rounded bg-surface-3"
          />
          {errors.routeName && (
            <p className="text-red-500 text-sm mt-1">{errors.routeName}</p>
          )}
        </div>
        <div>
          <label htmlFor="routeColor" className="block text-sm font-medium">
            Route Color
          </label>
          <input
            id="routeColor"
            type="color"
            name="routeColor"
            value={routeData.routeColor}
            onChange={handleRouteChange}
            className="w-full h-16 outline-none rounded bg-surface-3"
          />
          {errors.routeColor && (
            <p className="text-red-500 text-sm mt-1">{errors.routeColor}</p>
          )}
        </div>

        <hr className="my-8" />

        <Heading level={3}>Add Stops</Heading>
        <SearchableCombobox
          label="Stop"
          selected={selectedStop}
          onChange={handleStopSelection}
          options={[...stopsData, ...customStops]}
          placeholder="Select stop to add automatically"
          className="mb-4"
        />
        {errors.stops && (
          <p className="text-red-500 text-sm mt-1">{errors.stops}</p>
        )}
        <button
          type="button"
          onClick={() => setIsNewStopFormShown(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Add New Stop
        </button>

        <hr className="my-8" />

        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Save Route
        </button>
      </section>

      <section className="flex flex-col-reverse md:flex-col">
        <div className="h-[500px] py-4">
          <Heading level={3}>Preview</Heading>
          <MapContainer
            center={MAP_CENTER}
            zoom={DEFAULT_ZOOM}
            zoomControl={false}
            className="h-full w-full"
          >
            {stops.map((stop) => (
              <BusStopMarker
                showDetailedPopup={false}
                key={stop.id}
                position={[stop.lat, stop.lng]}
                stopName={stop.name}
                lineColor="#5F05B1"
              />
            ))}
            {stops.length > 1 && (
              <Polyline
                positions={stops.map((stop) => [stop.lat, stop.lng])}
                color={routeData.routeColor || "#000000"}
              />
            )}
            <TileLayerView tileMapKey="openstreetmap" />
          </MapContainer>
        </div>

        <ul className="space-y-2 mt-10">
          <Heading level={2}>Stops ({stops.length})</Heading>
          {stops.length === 0 && <p>No stops added yet.</p>}
          {[...stops].reverse().map((stop, reversedIndex) => {
            const actualIndex = stops.length - 1 - reversedIndex;
            return (
              <li
                key={stop.id}
                className="bg-surface-1/40 rounded-lg p-2 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{stop.name}</p>
                  <p className="text-sm text-gray-500">
                    Position: {actualIndex + 1} • ID: {stop.id}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleMoveStop(actualIndex, "up")}
                    disabled={actualIndex === 0}
                    className="px-2 py-1 bg-surface-3 hover:bg-surface-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fi fi-rr-angle-small-up flex" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveStop(actualIndex, "down")}
                    disabled={actualIndex === stops.length - 1}
                    className="px-2 py-1 bg-surface-3 hover:bg-surface-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fi fi-rr-angle-small-down flex" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStop(stop.id)}
                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    <i className="fi fi-rr-trash-xmark flex" />
                  </button>
                </div>
              </li>
            );
          })}
          {stops.length > 0 && (
            <div className="mt-4 p-2 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Route ID:</strong> {generateRouteId(stops)}
              </p>
            </div>
          )}
        </ul>
      </section>

      {isNewStopFormShown && (
        <div className="fixed top-0 left-0 z-[1111] px-4 w-screen h-screen bg-surface-2/50 backdrop-blur-2xl grid place-items-center">
          <div className="p-4 bg-background rounded-lg w-full lg:w-4/5 xl:w-3/4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Heading level={2}>Add New Stop</Heading>
              <button
                type="button"
                onClick={closeNewStopForm}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <section className="grid lg:grid-cols-2 gap-6 my-8">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Stop Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newStop.name || ""}
                    onChange={handleNewStopChange}
                    className="w-full p-3 outline-none rounded-lg bg-surface-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter stop name"
                  />
                  {errors.newStopName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newStopName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="lat"
                      className="block text-sm font-medium mb-1"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="lat"
                      name="lat"
                      value={newStop.lat !== undefined ? newStop.lat : ""}
                      onChange={handleNewStopChange}
                      className="w-full p-3 outline-none rounded-lg bg-surface-3 focus:ring-2 focus:ring-blue-500"
                      placeholder="Click map"
                      step="any"
                    />
                    {errors.newStopLat && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newStopLat}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lng"
                      className="block text-sm font-medium mb-1"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="lng"
                      name="lng"
                      value={newStop.lng !== undefined ? newStop.lng : ""}
                      onChange={handleNewStopChange}
                      className="w-full p-3 outline-none rounded-lg bg-surface-3 focus:ring-2 focus:ring-blue-500"
                      placeholder="Click map"
                      step="any"
                    />
                    {errors.newStopLng && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newStopLng}
                      </p>
                    )}
                  </div>
                </div>

                {newStop.lat !== undefined && newStop.lng !== undefined && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Generated ID:</strong> new-
                      {generateHexId(newStop.lat, newStop.lng)}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Save & Add Stop
                  </button>
                  <button
                    type="button"
                    onClick={closeNewStopForm}
                    className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Heading level={5} className="mb-2">
                    Interactive Map
                  </Heading>
                  <p className="text-sm text-gray-600 mb-3">
                    Click anywhere on the map to set coordinates
                  </p>
                  <div className="w-full h-[350px] rounded-lg overflow-hidden border border-surface-3">
                    <MapContainer
                      center={MAP_CENTER}
                      zoom={DEFAULT_ZOOM}
                      zoomControl={true}
                      className="h-full w-full"
                      ref={popupMapRef}
                    >
                      <TileLayerView tileMapKey="openstreetmap" />

                      {/* Show existing stops */}
                      {stops.map((stop) => (
                        <BusStopMarker
                          showDetailedPopup={false}
                          key={stop.id}
                          position={[stop.lat, stop.lng]}
                          stopName={stop.name}
                          lineColor="#5F05B1"
                        />
                      ))}

                      {/* Show route line between existing stops */}
                      {stops.length > 1 && (
                        <Polyline
                          positions={stops.map((stop) => [stop.lat, stop.lng])}
                          color={routeData.routeColor || "#000000"}
                          weight={3}
                          opacity={0.7}
                        />
                      )}

                      {/* Show temporary new stop marker */}
                      {tempMarkerPos && (
                        <BusStopMarker
                          showDetailedPopup={false}
                          position={[tempMarkerPos.lat, tempMarkerPos.lng]}
                          stopName={newStop.name || "New Stop"}
                          lineColor="#10B981"
                        />
                      )}

                      <MapClickHandler onMapClick={handleMapClick} />
                    </MapContainer>
                  </div>
                </div>

                {stops.length > 0 && (
                  <div className="bg-surface-1/40 rounded-lg p-3">
                    <h6 className="font-medium text-sm mb-2">
                      Current Route ({stops.length} stops)
                    </h6>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {stops.map((stop, index) => (
                        <div
                          key={stop.id}
                          className="flex items-center text-xs text-gray-600"
                        >
                          <span className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-white text-[10px] mr-2">
                            {index + 1}
                          </span>
                          <span className="truncate">{stop.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </ContainerLayout>
  );
};

export default AddNewRoutePage;
