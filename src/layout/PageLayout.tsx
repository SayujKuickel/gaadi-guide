import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Footer from "@/components/common/global/Footer";
import Header from "@/components/common/global/Header";
import GoBackButtonSection from "@/components/bus/GoBackButtonWrapper";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

interface PageLayoutProps {
  children: ReactNode;
  showBackBtn?: boolean;
}

const PageLayout = ({ children, showBackBtn = true }: PageLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
