import SidebarItem from "@/components/sidebar/SidebarItem";
import { sidebarItems } from "@/constants/sidebarItems";
import { Link, Outlet } from "react-router-dom";

const MapSidebarLayout = () => {
  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col-reverse md:flex-row">
      <aside
        className={`bg-surface border-t-2 border-t-surface-3 border-r-0 md:border-t-0 md:border-r-2 md:border-r-surface-3 w-screen pt-2 pb-6 md:p-0 left-0 bottom-0 md:top-0 z-[99999] md:w-20 md:h-screen`}
      >
        <Link
          to="/"
          className="block w-full place-items-center my-6 hidden md:visible md:grid"
        >
          <img
            src="/web-app-manifest-192x192.png"
            className="w-16 aspect-square"
            width={100}
            height={100}
            alt="Main logo for Kathmandu Bus Routes"
          />
        </Link>

        <ul className="flex items-center md:flex-col justify-around md:gap-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} item={item} sideBarIndex={-1} />
          ))}
        </ul>
      </aside>

      <Outlet />
    </main>
  );
};
export default MapSidebarLayout;
