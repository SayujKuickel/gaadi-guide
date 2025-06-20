import SidebarItem from "@/components/sidebar/SidebarItem";
import { sidebarItems } from "@/constants/sidebarItems";
import { Link, Outlet } from "react-router-dom";

const MapSidebarLayout = () => {
  return (
    <main className="w-screen h-screen">
      <aside
        className={`fixed bg-surface border-t-2 border-t-surface-3 border-r-0 md:border-t-0 md:border-r-2 md:border-r-surface-3 w-screen h-20 pb-2 left-0 bottom-0 md:top-0 z-[99999] md:w-20 md:h-screen`}
      >
        <div className="w-full place-items-center my-6 hidden md:visible md:grid">
          <Link to="/">
            <img
              src="/web-app-manifest-192x192.png"
              className="w-16 aspect-square"
              width={100}
              height={100}
              alt="Main logo for Kathmandu Bus Routes"
            />
          </Link>
        </div>

        <ul className="flex flex-row items-center justify-around md:justify-start md:flex-col gap-1 p-2">
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
