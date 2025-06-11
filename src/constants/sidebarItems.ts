export interface sidebarItem {
  key: number;
  name: string;
  icon: string;
  type?: string;
  url?: string;
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
  {
    key: 3,
    name: "Details",
    icon: "fi fi-rr-features",
    type: "redirect",
    url: "/bus",
  },
];
