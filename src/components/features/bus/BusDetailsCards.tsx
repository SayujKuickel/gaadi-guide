import type { ReactNode } from "react";

interface BusDetailsCardsProps {
  label: string;
  value: any;
  icon: ReactNode;
  lineColor: string;
}
const BusDetailsCards: React.FC<BusDetailsCardsProps> = ({
  label,
  value,
  icon,
  lineColor,
}) => {
  return (
    <div className="bg-surface p-3 rounded-lg flex items-center gap-3">
      <span
        style={{ background: `${lineColor}5f` }}
        className={` grid place-items-center w-12 aspect-square text-text text-2xl rounded-lg flex-shrink-0`}
      >
        {icon}
      </span>

      <p className="min-w-0">
        <span className="block text-xs font-semibold text-offText/80">
          {label}
        </span>

        <span className="block font-semibold text-base text-offText break-words leading-6">
          {value}
        </span>
      </p>
    </div>
  );
};

export default BusDetailsCards;
