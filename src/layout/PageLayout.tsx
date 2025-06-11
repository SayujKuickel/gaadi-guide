import { useEffect } from "react";
import type { ReactNode } from "react";
import Footer from "@/components/common/global/Footer";
import Header from "@/components/common/global/Header";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-background text-text min-h-screen">
      <Header />
      <article className="relative">{children}</article>

      <div className="my-24"></div>

      <Footer />
    </main>
  );
};

export default PageLayout;
