export interface sidebarItem {
  key: number;
  name: string;
  icon: string;
}

export const sidebarItems: sidebarItem[] = [
  {
    key: 0,
    name: "Routes",
    icon: "fi fi-rr-car-journey",
  },
  {
    key: 2,
    name: "Stops",
    icon: "fi fi-rr-land-layer-location",
  },
  {
    key: 1,
    name: "Search",
    icon: "fi fi-rr-search",
  },
];
