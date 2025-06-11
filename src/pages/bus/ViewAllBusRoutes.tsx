// data
import stopsData from "@/data/stops_data.json";
// layouts
import PageLayout from "@/layout/PageLayout";
import ContainerLayout from "@/layout/ContainerLayout";
// components
import BusRoutes from "@/data/route_data.json";
import Heading from "@/components/common/Heading";
import ViewRouteDetails from "@/components/bus/ViewRouteDetails";
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";
import SearchableCombobox from "@/components/common/SearchableCombobox";

const ViewAllBusRoutes = () => {
  const { selectedStop, setSelectedStop, filteredRoutes } =
    useFilterRoutesBySearch();

  if (!filteredRoutes) return null;

  return (
    <>
      <PageLayout>
        <ContainerLayout className="">
          <Heading level={1} className="mb-6">
            All Bus Routes
          </Heading>

          <section className="grid grid-cols-2 mb-4">
            <SearchableCombobox
              selected={selectedStop}
              onChange={(opt) => setSelectedStop(opt)}
              options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
              placeholder="Select your closest stop..."
            />
          </section>

          <div className="space-y-2">
            {filteredRoutes.map((route) => (
              <ViewRouteDetails
                priorityStop={selectedStop?.id}
                key={route.id}
                route={route}
              />
            ))}
          </div>
        </ContainerLayout>
      </PageLayout>
    </>
  );
};

export default ViewAllBusRoutes;
