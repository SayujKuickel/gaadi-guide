import { SITE_SUGGESTION_REDIREECT } from "@/constants/siteConfigs";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

interface RouteVerificationStatusProps {
  isVerified: boolean;
  showText?: boolean;
  showReportText?: boolean;
}

const RouteVerificationStatus: React.FC<RouteVerificationStatusProps> = ({
  showReportText = true,
  showText = true,
  isVerified,
}) => {
  return (
    <p className="text-offText/80 text-xs w-fit">
      <span className={` flex items-center gap-0.5 font-semibold`}>
        <span className={`${isVerified ? "text-sa-green" : "text-sa-red"}`}>
          {isVerified ? <ShieldCheck size={16} /> : <ShieldX size={16} />}
        </span>

        {showText && <>{isVerified ? "Verified" : "Unverified"}</>}
      </span>

      {!isVerified && showReportText && (
        <Link
          to={SITE_SUGGESTION_REDIREECT}
          target="_blank"
          className="text-text"
        >
          Please Report Bugs Here*
        </Link>
      )}
    </p>
  );
};
export default RouteVerificationStatus;
