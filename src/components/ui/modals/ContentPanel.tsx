import { type ReactNode } from "react";

interface ContentPanelProps {
  children: ReactNode;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ children }) => {
  return (
    <section className="px-2 pb-2 md:px-0 md:pb-0 md:pl-2 md:pt-2 w-full sm:w-xs lg:w-sm">
      <div className="px-4 py-3 bg-surface rounded-lg w-full relative">
        {children}
      </div>
    </section>
  );
};

export default ContentPanel;
