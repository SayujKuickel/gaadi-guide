import { SITE_SUGGESTION_REDIREECT } from "@/constants/siteConfigs";
import { ShieldCheck, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";

interface VerificationBadgeProps {
  isVerified: boolean;
  showText?: boolean;
  showReportText?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  showReportText = true,
  showText = true,
  isVerified,
}) => {
  return (
    <p className="text-offText/80 text-xs w-fit flex items-center gap-0.5">
      <span className={`${isVerified ? "text-sa-green" : "text-sa-red"}`}>
        {isVerified ? <ShieldCheck size={16} /> : <ShieldX size={16} />}
      </span>

      {showText && (
        <>
          {isVerified ? (
            <>Verified</>
          ) : (
            <Link
              to={SITE_SUGGESTION_REDIREECT}
              target="_blank"
              className="hover:text-text"
            >
              Unverified
            </Link>
          )}
        </>
      )}
    </p>
  );
};
export default VerificationBadge;
