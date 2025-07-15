import Button from "@/components/common/Button";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 md:bottom-8 md:right-8 z-[5555]">
      <Button
        onClick={handleScrollToTop}
        ariaLabel="Scroll to top"
        iconStyle="fi fi-rr-angle-small-up animate-in-fade text-xl"
        className="text-sm"
        variant="ghost"
      />
    </div>
  );
};

export default ScrollToTopButton;
