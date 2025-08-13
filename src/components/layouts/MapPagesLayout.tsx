import Sidebar from "@/components/global/sidebar/Sidebar";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MapPagesLayout: React.FC = () => {
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
