import route_data from "@/data/route_data.json";
import type { IRoute } from "@/types/route.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { Helmet } from "react-helmet";
import {
  SITE_TOP_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
import { ContainerLayout } from "@/components/layouts";
import { Heading } from "@/components/ui";
import { BusStopsSummary } from "@/components/features/bus";

const toTitleCase = (str: string) => {
  return str?.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

const BusOperatorDetailsPage = () => {
  const { name } = useParams();
  const [routes, setRoute] = useState<IRoute[] | null>(null);

  useEffect(() => {
    const operatorRoutes = route_data.filter((route) =>
      route?.operator?.some(
        (op) => op.split(" ").join("-").toLowerCase() === name
      )
    );

    if (!operatorRoutes || operatorRoutes.length === 0) {
      console.warn("[w] No route with name:", name);
      return;
    }

    setRoute(operatorRoutes);
  }, [name]);

  return (
    <>
      <Helmet>
        <title>
          {routes
            ? `${toTitleCase(name?.replace("-", " ") || "")}`
            : "Invalid Operator"}{" "}
          {SITE_TOP_TITLE}
        </title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.operators}/${name}`}
        />
      </Helmet>

      <ContainerLayout size="xs">
        {routes ? (
          <>
            <Heading className="mb-8 capitalize" level={1}>
              Routes by {name?.split("-")?.join(" ")}
            </Heading>

            <div className="space-y-10">
              {routes.map((route) => (
                <BusStopsSummary key={route.id} route={route} />
              ))}
            </div>
          </>
        ) : (
          <NotFound title="No Routes by the Operator" />
        )}
      </ContainerLayout>
    </>
  );
};

export default BusOperatorDetailsPage;
