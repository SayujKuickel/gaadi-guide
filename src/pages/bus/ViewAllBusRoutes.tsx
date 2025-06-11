// data
import stopsData from "@/data/stops_data.json";
// layouts
import PageLayout from "@/layout/PageLayout";
import ContainerLayout from "@/layout/ContainerLayout";
// components
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

          <section className="grid md:grid-cols-2 mb-4">
            <SearchableCombobox
              selected={selectedStop}
              onChange={(opt) => setSelectedStop(opt)}
              options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
              placeholder="Select your closest stop..."
            />
          </section>

          {filteredRoutes.length > 0 ? (
            <div className="space-y-2">
              {filteredRoutes.map((route) => (
                <ViewRouteDetails
                  priorityStop={selectedStop?.id}
                  key={route.id}
                  route={route}
                />
              ))}
            </div>
          ) : (
            <p className="text-offText">Selected stop is not in any routes!</p>
          )}
        </ContainerLayout>
      </PageLayout>
    </>
  );
};

export default ViewAllBusRoutes;
