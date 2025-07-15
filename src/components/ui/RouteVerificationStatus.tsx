import { SITE_SUGGESTION_REDIREECT } from "@/constants/siteConfigs";
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
  const isVerifiedIcon = isVerified
    ? "fi fi-rr-shield-trust"
    : "fi fi-rr-exclamation";
  const isVerifiedColor = isVerified ? " text-sa-green" : "text-sa-red";

  return (
    <p className="flex items-center gap-1 text-offText/80 text-xs w-fit">
      <i className={`${isVerifiedIcon} ${isVerifiedColor} flex`} />

      {showText && <>{isVerified ? "Verified" : "Unverified"}</>}

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
