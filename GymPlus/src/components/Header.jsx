import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Image from "./Image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Image
            src="src/assets/images/logo.png"
            alt="GymPlus Logo"
            className="h-10"
          />
          <span
            className={`text-2xl font-bold ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            GymPlus
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" label="Home" isScrolled={isScrolled} />
          <NavLink to="/#programs" label="Programs" isScrolled={isScrolled} />
          <NavLink
            to="/#membership"
            label="Membership"
            isScrolled={isScrolled}
          />
          <NavLink to="/#trainers" label="Trainers" isScrolled={isScrolled} />
          <NavLink to="/#contact" label="Contact" isScrolled={isScrolled} />
          <Link to="/#contact" className="btn-primary ml-4">
            Join Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FaTimes
              className={isScrolled ? "text-secondary" : "text-white"}
              size={24}
            />
          ) : (
            <FaBars
              className={isScrolled ? "text-secondary" : "text-white"}
              size={24}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-secondary bg-opacity-95 flex flex-col items-center justify-center space-y-8 transition-all duration-300 z-40 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <Link
          to="/"
          onClick={toggleMenu}
          className="text-white text-2xl font-bold hover:text-primary"
        >
          Home
        </Link>
        <Link
          to="/#programs"
          onClick={toggleMenu}
          className="text-white text-2xl font-bold hover:text-primary"
        >
          Programs
        </Link>
        <Link
          to="/#membership"
          onClick={toggleMenu}
          className="text-white text-2xl font-bold hover:text-primary"
        >
          Membership
        </Link>
        <Link
          to="/#trainers"
          onClick={toggleMenu}
          className="text-white text-2xl font-bold hover:text-primary"
        >
          Trainers
        </Link>
        <Link
          to="/#contact"
          onClick={toggleMenu}
          className="text-white text-2xl font-bold hover:text-primary"
        >
          Contact
        </Link>
        <Link to="/#contact" onClick={toggleMenu} className="btn-primary mt-4">
          Join Now
        </Link>
      </div>
    </header>
  );
};

// Helper component for nav links
const NavLink = ({ to, label, isScrolled }) => (
  <Link
    to={to}
    className={`text-lg font-medium hover:text-primary transition-colors ${
      isScrolled ? "text-secondary" : "text-white"
    }`}
  >
    {label}
  </Link>
);

export default Header;
