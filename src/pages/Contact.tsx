import { useState } from "react";
import PageLayout from "@/layout/PageLayout";
import ContainerLayout from "@/layout/ContainerLayout";
import { Link } from "react-router-dom";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  return (
    <PageLayout>
      <ContainerLayout>
        {loading && (
          <div className="text-offText leading-snug">
            <p className="mb-1">The Form is loading, please wait...</p>
            <Link
              to="https://garrulous-belly-2d2.notion.site/2172054224e680209d1dd7541bc86f48?pvs=105"
              target="_blank"
              className="text-text"
            >
              If the form doesnt doesn't load, Click here.
            </Link>
          </div>
        )}

        <div className="my-8 h-[275dvh] rounded-2xl relative">
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
  );
};

export default Contact;
