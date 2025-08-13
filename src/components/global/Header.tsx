import { Link } from "react-router-dom";
import React, { useState } from "react";
import { headerItems } from "@/constants/headers";
import logo from "@/assets/logo-192x192.png";
import { Menu, X } from "lucide-react";
import { siteUrlMappings } from "@/constants/siteConfigs";
import { Button } from "../ui";

const Header = () => {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuShown((prev) => !prev);

  return (
    <header className="bg-surface-2 sticky top-0 z-[99998] shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <Link
            to={`/${siteUrlMappings.search}`}
            className="block w-14 aspect-square shrink-0"
          >
            <img src={logo} alt="logo" />
          </Link>
          <div className="leading-tight">
            <p className="text-xl font-bold -mb-1">Gaadi</p>
            <p>Guide</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-4">
          {headerItems.map(({ path, name, newTab }) => (
            <li key={path}>
              <Link
                to={path}
                target={newTab ? "_blank" : undefined}
                className="block hover:underline transition-all"
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
            icon={isMobileMenuShown ? <X size={16} /> : <Menu size={16} />}
          />
        </div>
      </div>

      {isMobileMenuShown && (
        <aside className="fixed inset-0 z-[99999] h-screen bg-background p-4 md:hidden">
          <nav className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link
                to={`/${siteUrlMappings.search}`}
                className="block w-14 aspect-square shrink-0"
              >
                <img src={logo} alt="logo" />
              </Link>
              <div className="leading-tight">
                <p className="text-xl font-bold -mb-1">Gaadi</p>
                <p>Guide</p>
              </div>
            </div>

            <Button
              ariaLabel="Close sidebar"
              onClick={toggleMobileMenu}
              icon={<X size={16} />}
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
                  {icon}

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

export default React.memo(Header);
