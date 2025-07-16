import type { ReactNode } from "react";

interface RouteDetailsCardProps {
  label: string;
  value: any;
  icon: ReactNode;
  lineColor: string;
}
const RouteDetailsCard: React.FC<RouteDetailsCardProps> = ({
  label,
  value,
  icon,
  lineColor,
}) => {
  return (
    <div className="bg-surface p-3 rounded-lg flex items-center gap-3">
      <span
        style={{ background: `${lineColor}5f` }}
        className={` grid place-items-center w-12 aspect-square text-offText text-2xl rounded-lg`}
      >
        {icon}
      </span>

      <p>
        <span className="block text-sm text-offText/80">{label}</span>
        <span className="block font-semibold text-lg text-text">{value}</span>
      </p>
    </div>
  );
};

export default RouteDetailsCard;
