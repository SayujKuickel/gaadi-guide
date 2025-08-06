import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import {
  SITE_TOP_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
import Route_data from "@/data/route_data.json";
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const slugify = (str: string) => str.split(" ").join("-").toLowerCase();

const BusOperatorsPage = () => {
  const operators: string[] = [
    ...new Set(Route_data.flatMap((route) => route.operator ?? [])),
  ].filter(Boolean);

  if (!operators || operators.length === 0) return null;

  return (
    <>
      <Helmet>
        <title>Operators {SITE_TOP_TITLE}</title>
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
                <span>
                  <span className="font-bold text-xl mr-1">{index + 1}.</span>
                  <span className="font-medium">{operator}</span>
                </span>

                <Link to={`/${siteUrlMappings.operators}/${slugify(operator)}`}>
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
