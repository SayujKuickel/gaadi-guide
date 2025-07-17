import { useState } from "react";
import PageLayout from "@/layout/PageLayout";
import ContainerLayout from "@/layout/ContainerLayout";
import { Link } from "react-router-dom";
import {
  SITE_BASE_TITLE,
  SITE_BASE_URL,
  SITE_SUGGESTION_REDIREECT,
} from "@/constants/siteConfigs";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Helmet>
        <title>Contact | {SITE_BASE_TITLE} </title>
        <link rel="canonical" href={`${SITE_BASE_URL}/contact`} />
      </Helmet>

      <PageLayout>
        <ContainerLayout size="sm">
          {loading && (
            <div className="text-offText leading-snug">
              <p className="mb-1">The Form is loading, please wait...</p>
              <Link
                to={SITE_SUGGESTION_REDIREECT}
                target="_blank"
                className="text-text"
              >
                If the form doesnt doesn't load, Click here.
              </Link>
            </div>
          )}

          <div className="my-8 h-[275dvh] rounded-2xl overflow-hidden relative">
            <iframe
              src="https://garrulous-belly-2d2.notion.site/ebd/2172054224e680209d1dd7541bc86f48"
              width="100%"
              height="100%"
              className="w-full h-full border-none"
              onLoad={() => setLoading(false)}
            />
          </div>
        </ContainerLayout>
      </PageLayout>
    </>
  );
};

export default Contact;
