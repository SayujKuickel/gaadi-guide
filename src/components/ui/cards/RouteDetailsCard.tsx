interface RouteDetailsCardProps {
  label: string;
  value: any;
  icon: string;
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
      <i
        style={{ background: `${lineColor}5f` }}
        className={`${icon} grid place-items-center w-12 aspect-square text-offText text-2xl rounded-lg`}
      />
      <p>
        <span className="block text-sm text-offText/80">{label}</span>
        <span className="block font-semibold text-lg text-text">{value}</span>
      </p>
    </div>
  );
};

export default RouteDetailsCard;
