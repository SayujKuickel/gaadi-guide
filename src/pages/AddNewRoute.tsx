import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import TileLayerView from "@/components/map/views/TileLayerView";
import { DEFAULT_ZOOM, MAP_CENTER } from "@/constants/mapSettings";
import ContainerLayout from "@/layout/ContainerLayout";
import { LatLng } from "leaflet";
import { useState, useRef } from "react";
import { MapContainer, Marker, Polyline, useMapEvents } from "react-leaflet";
import stops_data from "@/data/stops_data.json";
import type { IStop } from "@/types/stop.types";

// Define type for error messages
interface Errors {
  routeName?: string;
  routeColor?: string;
  stops?: string;
  newStopId?: string;
  newStopName?: string;
  newStopLat?: string;
  newStopLng?: string;
}

// Component to handle map click events for adding new stop
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

const AddNewRoute = () => {
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
    id: "",
    name: "",
    lat: undefined,
    lng: undefined,
  });
  const [tempMarkerPos, setTempMarkerPos] = useState<LatLng | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Handle input changes for route
  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRouteData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Handle input changes for new stop
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
      setTempMarkerPos(
        newStop.lat !== undefined && newStop.lng !== undefined
          ? new LatLng(newStop.lat, newStop.lng)
          : null
      );
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Handle map click to set new stop coordinates
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

  // Add stop to route
  const handleAddStopToRoute = () => {
    if (!selectedStop) {
      setErrors((prev) => ({ ...prev, stops: "Please select a stop to add." }));
      return;
    }
    if (stops.some((stop) => stop.id === selectedStop.id)) {
      setErrors((prev) => ({ ...prev, stops: "This stop is already added." }));
      return;
    }
    setStops((prev) => [...prev, selectedStop]);
    setSelectedStop(null);
    setErrors((prev) => ({ ...prev, stops: undefined }));
  };

  // Delete stop
  const handleDeleteStop = (stopId: string) => {
    setStops((prev) => prev.filter((stop) => stop.id !== stopId));
  };

  // Add new stop
  const handleAddStop = () => {
    const newErrors: Errors = {};
    if (!newStop.id?.trim()) {
      newErrors.newStopId = "Stop ID is required.";
    } else if (
      stopsData.some((stop) => stop.id === newStop.id) ||
      customStops.some((stop) => stop.id === newStop.id)
    ) {
      newErrors.newStopId = "Stop ID must be unique.";
    }
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

    const newStopData: IStop = {
      id: `sa-${newStop.id!}`,
      name: newStop.name!,
      lat: newStop.lat!,
      lng: newStop.lng!,
    };
    setCustomStops((prev) => [...prev, newStopData]);
    setStopsData((prev) => [newStopData, ...prev]);
    setNewStop({ id: "", name: "", lat: undefined, lng: undefined });
    setTempMarkerPos(null);
    setIsNewStopFormShown(false);
    setErrors({});
  };

  // Move stop up or down
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

  // Validate and submit form
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

    const route = { ...routeData, stops };
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

  if (!stopsData || stopsData.length === 0) {
    return (
      <ContainerLayout className="" isCenter={true} isSmall={false}>
        <section className="space-y-4">
          <Heading level={3}>Add Route</Heading>
          <p className="text-red-500">
            No stops available. Please add a new stop.
          </p>
          <form className="p-4 bg-background rounded-lg space-y-4">
            <Heading level={4} className="mb-4">
              Add New Stop
            </Heading>
            <div className="mb-3">
              <label htmlFor="id" className="block text-sm font-medium">
                Stop ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={newStop.id || ""}
                onChange={handleNewStopChange}
                className="w-full p-2 outline-none rounded bg-surface-3"
                placeholder="Enter stop ID"
              />
              {errors.newStopId && (
                <p className="text-red-500 text-sm mt-1">{errors.newStopId}</p>
              )}
            </div>
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
                <TileLayerView tileMapKey="" />
                {tempMarkerPos && <Marker position={tempMarkerPos} />}
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
                  setNewStop({
                    id: "",
                    name: "",
                    lat: undefined,
                    lng: undefined,
                  });
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
      isSmall={false}
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
          onChange={(opt: IStop | null) => setSelectedStop(opt)}
          options={[...stopsData, ...customStops]}
          placeholder="Select stop to add"
          className="mb-4"
        />
        {errors.stops && (
          <p className="text-red-500 text-sm mt-1">{errors.stops}</p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAddStopToRoute}
            disabled={!selectedStop}
            className="px-4 py-2 bg-surface-3 hover:bg-surface-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Stop
          </button>
          <button
            type="button"
            onClick={() => setIsNewStopFormShown(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Add New Stop
          </button>
        </div>

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
          <Heading level={3}>Preview: </Heading>
          <MapContainer
            center={MAP_CENTER}
            zoom={DEFAULT_ZOOM}
            zoomControl={false}
            className="h-full w-full"
          >
            {stops.map((stop) => (
              <Marker key={stop.id} position={[stop.lat, stop.lng]} />
            ))}
            {stops.length > 1 && (
              <Polyline
                positions={stops.map((stop) => [stop.lat, stop.lng])}
                color={routeData.routeColor || "#000000"}
              />
            )}
            <TileLayerView tileMapKey="" />
          </MapContainer>
        </div>

        <ul className="space-y-2 mt-10">
          <Heading level={4}>Stops</Heading>
          {stops.length === 0 && <p>No stops added yet.</p>}
          {stops.map((stop, index) => (
            <li
              key={stop.id}
              className="bg-surface-1/40 rounded-lg p-2 flex items-center justify-between"
            >
              <p>{stop.name}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleMoveStop(index, "up")}
                  disabled={index === 0}
                  className="px-2 py-1 bg-surface-3 hover:bg-surface-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fi fi-rr-angle-small-up flex" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveStop(index, "down")}
                  disabled={index === stops.length - 1}
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
          ))}
        </ul>
      </section>

      {isNewStopFormShown && (
        <div className="fixed top-0 left-0 z-[1000]  px-4 w-screen h-screen bg-surface-2/50 backdrop-blur-2xl grid place-items-center">
          <form className="p-4 bg-background rounded-lg w-full lg:w-2/3">
            <Heading level={4} className="mb-4">
              Add New Stop
            </Heading>{" "}
            <section className="grid md:grid-cols-2 gap-4 my-8">
              <div className="space-y-3">
                <div>
                  <label htmlFor="id" className="block text-sm font-medium">
                    Stop ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={newStop.id || ""}
                    onChange={handleNewStopChange}
                    className="w-full p-2 outline-none rounded bg-surface-3"
                    placeholder="Enter stop ID"
                  />
                  {errors.newStopId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newStopId}
                    </p>
                  )}
                </div>
                <div>
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
                <div>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newStopLat}
                    </p>
                  )}
                </div>
                <div>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newStopLng}
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                <Heading level={5}>Click to add</Heading>

                <div className="w-full md:w-300px h-[300px]">
                  <MapContainer
                    center={MAP_CENTER}
                    zoom={DEFAULT_ZOOM}
                    zoomControl={false}
                    className="h-full w-full"
                    ref={mapRef}
                  >
                    <TileLayerView tileMapKey="" />
                    {tempMarkerPos && <Marker position={tempMarkerPos} />}
                    <MapClickHandler onMapClick={handleMapClick} />
                  </MapContainer>
                </div>
              </div>
            </section>
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
                  setIsNewStopFormShown(false);
                  setNewStop({
                    id: "",
                    name: "",
                    lat: undefined,
                    lng: undefined,
                  });
                  setTempMarkerPos(null);
                  setErrors({});
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </ContainerLayout>
  );
};

export default AddNewRoute;
