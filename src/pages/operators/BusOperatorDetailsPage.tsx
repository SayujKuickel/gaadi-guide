import Heading from "@/components/common/Heading";
import route_data from "@/data/route_data.json";
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";
import type { IRoute } from "@/types/route.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import ViewRouteDetails from "@/components/bus/ViewRouteDetails";

const BusOperatorDetailsPage = () => {
  const { name } = useParams();
  const [routes, setRoute] = useState<IRoute[] | null>(null);

  useEffect(() => {
    const operatorRoutes = route_data.filter(
      (route) => route?.operator?.split(" ").join("-").toLowerCase() === name
    );

    if (!operatorRoutes || operatorRoutes.length === 0) {
      console.warn("[w] No route with name:", name);
      return;
    }

    setRoute(operatorRoutes);
  }, [name]);

  return (
    <>
      <PageLayout>
        <ContainerLayout size="xs">
          {routes ? (
            <>
              <Heading className="mb-8 capitalize" level={1}>
                Routes by {name?.split("-")?.join(" ")}
              </Heading>

              <div className="space-y-10">
                {routes.map((route) => (
                  <ViewRouteDetails key={route.id} route={route} />
                ))}
              </div>
            </>
          ) : (
            <NotFound title="No Routes by the Operator" />
          )}
        </ContainerLayout>
      </PageLayout>
    </>
  );
};

export default BusOperatorDetailsPage;
