import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Footer from "@/components/common/global/Footer";
import Header from "@/components/common/global/Header";
import GoBackButtonSection from "@/components/bus/GoBackButtonWrapper";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

interface PageLayoutProps {
  children: ReactNode;
  showBackBtn?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBackBtn = true,
}) => {
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

      <ScrollToTopButton />

      {showBackBtn && <GoBackButtonSection />}

      <article className="relative">{children}</article>

      <Footer />
    </main>
  );
};

export default PageLayout;
