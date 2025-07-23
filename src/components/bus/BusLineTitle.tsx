import { Circle } from "lucide-react";
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
    <Heading
      className={`text-offText flex items-center gap-0 ${className}`}
      level={level}
    >
      <p>
        <Circle
          style={{
            fill: lineColor,
            stroke: lineColor,
          }}
        />
      </p>

      <span className="ml-1 leading-tight">{name}</span>
    </Heading>
  );
};

export default BusLineTitle;
