import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Button";

interface Route {
  name: string;
  path: string;
  icon: string;
  newTab?: boolean;
}

const routes: Route[] = [
  {
    name: "Map",
    path: "/",
    icon: "fi fi-rr-map",
  },
  {
    name: "Bus Routes",
    path: "/bus",
    icon: "fi fi-rr-map-location-track",
  },
  {
    name: "About",
    path: "https://sayuj.com.np",
    icon: "fi fi-rr-user",
    newTab: true,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: "fi fi-rr-comment-alt",
  },
];

const Header = () => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  function handleMobileMenuToggle() {
    setIsMobileMenuShown((prev) => !prev);
  }

  return (
    <header className="bg-surface-1 relative">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between relative z-[99998]">
        <div className="flex items-center gap-2">
          <Link to={"/"} className="block w-14 aspect-square">
            <img src="/web-app-manifest-512x512.png" alt="logo" />
          </Link>
          <p className="hidden md:block">
            <span className="block text-xl font-bold -mb-1">Kathmandu</span>
            <span className="block">Bus Routes</span>
          </p>
        </div>

        <div className="block md:hidden">
          <Button
            ariaLabel="Header open button"
            onClick={handleMobileMenuToggle}
            iconStyle={
              isMobileMenuShown
                ? "fi fi-rr-cross-small"
                : "fi fi-rr-menu-burger"
            }
          />
        </div>

        <ul className="flex items-center gap-2 hidden md:block md:flex">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                target={route.newTab ? "_blank" : undefined}
                className="hover:bg-surface-3 px-2 py-3 rounded-lg transition-all"
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isMobileMenuShown && (
        <aside className="block md:hidden fixed top-0 left-0 z-[99999] w-screen h-screen bg-background p-4 ">
          <nav className="flex items-center gap-2 justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link to={"/"} className="block w-14 aspect-square">
                <img src="/web-app-manifest-512x512.png" alt="logo" />
              </Link>
              <p className="hidden md:block">
                <span className="block text-xl font-bold -mb-1">Kathmandu</span>
                <span className="block">Bus Routes</span>
              </p>
            </div>

            <div className="block md:hidden">
              <Button
                ariaLabel="Sidebar close button"
                onClick={handleMobileMenuToggle}
                iconStyle={
                  isMobileMenuShown
                    ? "fi fi-rr-cross-small"
                    : "fi fi-rr-menu-burger"
                }
              />
            </div>
          </nav>

          <ul className="flex flex-col gap-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  target={route.newTab ? "_blank" : undefined}
                  className="block bg-surface border border-on-surface/25 px-2 py-3 rounded-lg transition-all flex items-center gap-2"
                >
                  <i className={`flex ${route.icon}`} />
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </header>
  );
};

export default Header;
