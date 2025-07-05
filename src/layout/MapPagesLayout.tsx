import Sidebar from "@/components/common/global/Sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MapPagesLayout = () => {
  useEffect(() => {
    document.body.classList.add("disable-scroll-mobile");

    return () => document.body.classList.remove("disable-scroll-mobile");
  }, []);

  return (
    <main className="w-screen h-[100svh] fixed overflow-hidden">
      <div className="w-full h-full overflow-hidden flex flex-col-reverse md:flex-row">
        <Sidebar />

        <div className="relative flex-1 w-full h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MapPagesLayout;
