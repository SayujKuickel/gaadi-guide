import type { ReactNode } from "react";
import { createElement } from "react";
import { MessageSquareText, Map, Route, User } from "lucide-react";

export interface IHeaderItem {
  name: string;
  path: string;
  icon: ReactNode;
  newTab?: boolean;
}

export const headerItems: IHeaderItem[] = [
  {
    name: "Map",
    path: "/",
    icon: createElement(Map, { size: 16 }),
  },
  {
    name: "Bus Routes",
    path: "/bus",
    icon: createElement(Route, { size: 16 }),
  },
  {
    name: "About",
    path: "/about",
    icon: createElement(User, { size: 16 }),
  },
  {
    name: "Message",
    path: "/contact",
    icon: createElement(MessageSquareText, { size: 16 }),
  },
];
