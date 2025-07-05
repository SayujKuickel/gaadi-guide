export interface IHeaderItem {
  name: string;
  path: string;
  icon: string;
  newTab?: boolean;
}

export const headerItems: IHeaderItem[] = [
  {
    name: "Map",
    path: "/",
    icon: "fi fi-rr-map",
  },
  {
    name: "Bus Routes",
    path: "/bus",
    icon: "fi fi-rr-map-location-track",
  },
  {
    name: "About",
    path: "/about",
    icon: "fi fi-rr-user",
  },
  {
    name: "Message",
    path: "/contact",
    icon: "fi fi-rr-comment-alt",
  },
];
