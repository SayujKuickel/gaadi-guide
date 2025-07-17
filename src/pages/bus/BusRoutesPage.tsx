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
import { Helmet } from "react-helmet";
import { SITE_BASE_TITLE, SITE_BASE_URL } from "@/constants/siteConfigs";

const BusRoutesPage = () => {
  const { selectedStop, setSelectedStop, filteredRoutes } =
    useFilterRoutesBySearch();

  return (
    <>
      <Helmet>
        <title>Routes | {SITE_BASE_TITLE}</title>
        <link rel="canonical" href={`${SITE_BASE_URL}/bus`} />
      </Helmet>

      <PageLayout>
        <ContainerLayout size="xs">
          <Heading level={1} className="mb-6">
            All Bus Routes
          </Heading>

          <section className="grid md:grid-cols-4 mb-8">
            <SearchableCombobox
              label="Bus Stop"
              selected={selectedStop}
              onChange={(opt) => setSelectedStop(opt)}
              options={stopsData.map((stp) => ({
                id: stp.id,
                name: stp.name,
              }))}
              placeholder="e.g. Gaushala Stop"
              className="col-span-4 md:col-span-3 lg:col-span-2"
            />
          </section>

          {filteredRoutes && filteredRoutes.length > 0 ? (
            <div className="space-y-10">
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

export default BusRoutesPage;
