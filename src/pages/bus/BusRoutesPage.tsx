import { Helmet } from "react-helmet";
// \hooks
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";
// \extra
import stopsData from "@/data/stops_data.json";
import {
  SITE_TOP_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
// \components
import { ContainerLayout } from "@/components/layouts";
import { Button, Heading, SearchableCombobox } from "@/components/ui";
import { BusStopsSummary } from "@/components/features/bus";

const BusRoutesPage = () => {
  const { selectedStop, setSelectedStop, filteredRoutes } =
    useFilterRoutesBySearch();

  return (
    <>
      <Helmet>
        <title>Routes {SITE_TOP_TITLE}</title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.bus}`}
        />
      </Helmet>

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
              <BusStopsSummary
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
    </>
  );
};

export default BusRoutesPage;
