import { FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Social", href: "#social" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <a className="text-xl font-bold text-stone-800" href="#">
          handle.com
        </a>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent`}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-stone-600 hover:text-stone-900"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
