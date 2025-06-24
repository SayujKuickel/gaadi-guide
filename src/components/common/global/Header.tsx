import { Link } from "react-router-dom";
import { useState } from "react";
import { headerItems } from "@/constants/headerItems";
import Button from "../Button";

const Header = () => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuShown((prev) => !prev);

  return (
    <header className="bg-surface-1 sticky top-0 z-[99998] shadow-sm">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <Link to="/" className="block w-14 aspect-square shrink-0">
            <img src="/web-app-manifest-512x512.png" alt="logo" />
          </Link>
          <div className="hidden md:block leading-tight">
            <p className="text-xl font-bold -mb-1">Kathmandu</p>
            <p>Bus Routes</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-4">
          {headerItems.map(({ path, name, newTab }) => (
            <li key={path}>
              <Link
                to={path}
                target={newTab ? "_blank" : undefined}
                className="hover:bg-surface-3 px-3 py-2 rounded-lg transition-colors"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            ariaLabel="Toggle mobile menu"
            onClick={toggleMobileMenu}
            iconStyle={
              isMobileMenuShown
                ? "fi fi-rr-cross-small"
                : "fi fi-rr-menu-burger"
            }
          />
        </div>
      </div>

      {isMobileMenuShown && (
        <aside className="fixed inset-0 z-[99999] h-screen bg-background p-4 md:hidden">
          <nav className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link to="/" className="block w-14 aspect-square">
                <img src="/web-app-manifest-512x512.png" alt="logo" />
              </Link>
              <div className="leading-tight">
                <p className="text-xl font-bold -mb-1">Kathmandu</p>
                <p>Bus Routes</p>
              </div>
            </div>
            <Button
              ariaLabel="Close sidebar"
              onClick={toggleMobileMenu}
              iconStyle="fi fi-rr-cross-small"
            />
          </nav>

          <ul className="flex flex-col gap-3">
            {headerItems.map(({ path, name, icon, newTab }) => (
              <li key={path}>
                <Link
                  to={path}
                  target={newTab ? "_blank" : undefined}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-on-surface/25 bg-surface transition-all"
                  onClick={toggleMobileMenu}
                >
                  <i className={`flex ${icon}`} />
                  {name}
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
