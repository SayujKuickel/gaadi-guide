import type { ReactNode } from "react";
import { createElement } from "react";
import { MessageSquareText, Map, Route, User } from "lucide-react";
import { siteUrlMappings } from "./siteConfigs";

export interface IHeaderItem {
  name: string;
  path: string;
  icon: ReactNode;
  newTab?: boolean;
}

export const headerItems: IHeaderItem[] = [
  {
    name: "Map",
    path: `/${siteUrlMappings.routes}`,
    icon: createElement(Map, { size: 16 }),
  },
  {
    name: "Bus Routes",
    path: `/${siteUrlMappings.bus}`,
    icon: createElement(Route, { size: 16 }),
  },
  {
    name: "About",
    path: `/${siteUrlMappings.about}`,
    icon: createElement(User, { size: 16 }),
  },
  {
    name: "Message",
    path: `/${siteUrlMappings.contact}`,
    icon: createElement(MessageSquareText, { size: 16 }),
  },
];
