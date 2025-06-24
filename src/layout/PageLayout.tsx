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
    <main className="bg-background text-text min-h-screen relative">
      <Header />

      {showBackBtn && <GoBackButtonSection />}
      <article className="relative">
        <ScrollToTopButton />

        {children}
      </article>
      <div className="my-24"></div>
      <Footer />
    </main>
  );
};

export default PageLayout;
