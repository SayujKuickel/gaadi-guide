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
      <span
        style={{
          background: lineColor,
        }}
        className={"w-6 aspect-square rounded-full inline-block"}
      />

      <span className="ml-1">{name}</span>
    </Heading>
  );
};

export default BusLineTitle;
