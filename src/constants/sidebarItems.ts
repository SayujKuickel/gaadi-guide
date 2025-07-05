export interface ISidebarItem {
  key: number;
  name: string;
  icon: string;
  type?: string;
  url?: string;
}

export const sidebarItems: ISidebarItem[] = [
  {
    key: 0,
    name: "Routes",
    icon: "fi fi-rr-track",
    url: "/routes",
  },
  {
    key: 2,
    name: "Stops",
    icon: "fi fi-rr-land-layer-location",
    url: "/stops",
  },
  {
    key: 1,
    name: "Search",
    icon: "fi fi-rr-search",
    url: "/search",
  },
];
