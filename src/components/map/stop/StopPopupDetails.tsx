import type React from "react";
import { Link } from "react-router-dom";

interface StopPopupDetailsProps {
  id?: string;
}

const StopPopupDetails: React.FC<StopPopupDetailsProps> = ({ id }) => {
  if (!id) return null;

  return (
    <div className="grid grid-cols-2 gap-1">
      <Link
        style={{ color: "white" }}
        className="flex-1 block bg-sa-blue/80 hover:bg-sa-blue transition-all text-sm leading-tight text-center p-2 rounded-lg"
        to={`/search?from=${id}&stop=${id}`}
      >
        Start Here
      </Link>
      <Link
        style={{ color: "white" }}
        className="flex-1 block bg-sa-blue/80 hover:bg-sa-blue transition-all text-sm leading-tight text-center p-2 rounded-lg"
        to={`/search?to=${id}&stop=${id}`}
      >
        Goto Here
      </Link>
      <Link
        style={{ color: "white" }}
        className="flex-1 col-span-2 block bg-sa-blue/80 hover:bg-sa-blue transition-all text-sm leading-tight text-center p-2 rounded-lg"
        to={`/stops?stop=${id}`}
      >
        View Routes
      </Link>
    </div>
  );
};

export default StopPopupDetails;
