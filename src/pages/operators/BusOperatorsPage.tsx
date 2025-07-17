import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import {
  SITE_BASE_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
import Route_data from "@/data/route_data.json";
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const BusOperatorsPage = () => {
  const operators = [
    ...new Set(Route_data.map((route) => route.operator && route.operator)),
  ].filter((operator) => operator);

  if (!operators || !(operators?.length >= 0)) return;

  return (
    <>
      <Helmet>
        <title>Operators | {SITE_BASE_TITLE}</title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.operators}`}
        />
      </Helmet>

      <PageLayout>
        <ContainerLayout size="xs">
          <Heading className="mb-6" level={1}>
            All Operators
          </Heading>

          <div className="space-y-3">
            {operators.map((operator, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-surface-1 text-on-surface rounded-lg"
              >
                <span className="">
                  <span className="font-bold text-xl mr-1">{index + 1}.</span>
                  <span className="font-medium">{operator}</span>
                </span>

                <Link
                  to={`/${siteUrlMappings.operators}/${operator
                    ?.split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Button
                    title="View Routes"
                    icon={<ChevronRight size={16} />}
                    className="flex-row-reverse text-xs"
                    ariaLabel={`View Routes for ${operator}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </ContainerLayout>
      </PageLayout>
    </>
  );
};

export default BusOperatorsPage;
