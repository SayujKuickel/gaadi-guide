import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import GoBackButtonSection from "@/components/sections/GoBackButtonSection";
import ScrollToTopSection from "@/components/sections/ScrollToTopSection";
import { Button } from "../ui";
import ContainerLayout from "./ContainerLayout";

interface PageLayoutProps {
  showBackBtn?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ showBackBtn = true }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <main>
      <Header />

      <ScrollToTopSection />

      {showBackBtn && <GoBackButtonSection />}

      <article className="relative bg0re">
        <Outlet />
      </article>

      <Footer />
    </main>
  );
};

export default PageLayout;
