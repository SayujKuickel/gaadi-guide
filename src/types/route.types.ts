export interface IRoute {
  id: string;
  name: string;
  lineColor: string;
  stops: string[];
  duration?: number;
  operator?: string;
  isVerifiedRoute?: boolean;
}
