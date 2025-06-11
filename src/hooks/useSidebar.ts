import { useState } from "react";

const useSidebar = () => {
  const [sideBarIndex, setSidebarIndex] = useState(0);

  return { sideBarIndex, setSidebarIndex };
};

export default useSidebar;
