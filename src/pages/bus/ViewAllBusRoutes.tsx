import PageLayout from "@/layout/PageLayout";
import BusRoutes from "@/data/route_data.json";
import ContainerLayout from "@/layout/ContainerLayout";
import Heading from "@/components/common/Heading";
import ViewRouteDetails from "@/components/bus/ViewRouteDetails";

const ViewAllBusRoutes = () => {
  return (
    <>
      <PageLayout>
        <ContainerLayout className="pt-12">
          <Heading level={1} className="mb-6">
            All Bus Routes
          </Heading>

          <div className="space-y-2">
            {BusRoutes.map((route) => (
              <ViewRouteDetails key={route.id} route={route} />
            ))}
          </div>
        </ContainerLayout>
      </PageLayout>
    </>
  );
};

export default ViewAllBusRoutes;
