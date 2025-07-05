import { useEffect } from "react";
import SidebarItem from "@/components/sidebar/SidebarItem";
import { sidebarItems } from "@/constants/sidebarItems";
import { Link, Outlet, useLocation } from "react-router-dom";

const MapSidebarContentsLayout = () => {
  useEffect(() => {
    document.body.classList.add("map-layout");
    document.documentElement.classList.add("map-layout");

    return () => {
      document.body.classList.remove("map-layout");
      document.documentElement.classList.remove("map-layout");
    };
  }, []);

  const location = useLocation();

  return (
    <main className="w-full h-full overflow-hidden flex flex-col-reverse md:flex-row">
      <aside
        className={`bg-surface border-t-2 border-t-surface-3 border-r-0 md:border-t-0 md:border-r-2 md:border-r-surface-3 w-screen pt-2 pb-4 md:p-0 md:w-20 md:h-screen`}
      >
        <Link
          to="/"
          className="hidden w-full place-items-center my-4
           md:visible md:grid"
        >
          <img
            src="/web-app-manifest-192x192.png"
            className="w-10 aspect-square"
            width={100}
            height={100}
            alt="Main logo for Kathmandu Bus Routes"
          />
        </Link>
        <ul className="flex items-center md:flex-col justify-around md:gap-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              isActive={location.pathname.startsWith(item?.url || "")}
            />
          ))}
        </ul>
      </aside>

      <Outlet />
    </main>
  );
};

export default MapSidebarContentsLayout;
