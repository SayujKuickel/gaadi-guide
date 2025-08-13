import { Link } from "react-router-dom";
import { BusFront } from "lucide-react";
import { siteUrlMappings } from "@/constants/siteConfigs";
import { Button } from "../../ui";

const MapControlsContainer = ({ children }: any) => {
  return (
    <aside className="fixed right-0 top-0 pr-2 pt-2 z-[1111] flex flex-col justify-center items-center gap-2">
      {children}

      <Link to={`/${siteUrlMappings.bus}`}>
        <Button
          className="text-base md:text-xl"
          ariaLabel="Go to bus details page"
          icon={<BusFront size={18} />}
        />
      </Link>
    </aside>
  );
};

export default MapControlsContainer;
