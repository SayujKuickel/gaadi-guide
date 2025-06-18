import Heading from "../common/Heading";

interface BusLineTitleProps {
  lineColor: string;
  name: string;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

const BusLineTitle: React.FC<BusLineTitleProps> = ({
  className,
  lineColor,
  name,
  level = 3,
}) => {
  return (
    <Heading className={`text-offText ${className}`} level={level}>
      <span className="inline-block">
        <i
          className="fi fi-rr-circle rounded-full w-fit aspect-square grid place-items-center"
          style={{ background: lineColor, color: lineColor }}
        />
      </span>

      <span className="ml-1">{name}</span>
    </Heading>
  );
};

export default BusLineTitle;
