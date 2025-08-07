export interface IRoute {
  id: string;
  name: string;
  lineColor: string;
  stops: string[];
  operator?: string[];
  isVerifiedRoute?: boolean;
  details?: IRouteSummary;
}

interface IRouteSummary {
  distance_meter?: number;
  total_bus?: number;
  duration_mins?: number;
}
