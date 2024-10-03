"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [theme, setTheme] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setIsScrolled(currentScrollPos > 50);
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else {
      const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.classList.add(defaultTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme!);
    document.documentElement.classList.add(newTheme);
  };

  const navItemStyle = {
    color: "inherit",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "bold",
    fontSize: "0.8rem",
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? `${
              theme === "light"
                ? "bg-white text-black shadow-lg"
                : "bg-black text-white shadow-lg"
            }`
          : "bg-transparent text-foreground dark:text-white"
      } ${!isVisible ? "-top-20" : "top-0"}`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo and Theme Toggle (Mobile View) */}
        <div className="flex items-center">
          <Link
            href="/"
            className="nav-item transition-colors px-4 py-2 text-2xl font-bold"
          >
            Xamined
          </Link>
          <div className="ml-4 md:hidden">
            <button
              className="flex items-center justify-center p-2 rounded-full focus:outline-none"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <BsSun className="text-yellow-500" size={20} />
              ) : (
                <BsMoon className="text-gray-800" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Centered Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
          <Link href="/" className="nav-item transition-colors px-2 py-1" style={navItemStyle}>
            Home
          </Link>
          <Link href="/tweet-analyzer" className="nav-item transition-colors px-2 py-1" style={navItemStyle}>
            Tweet Analyzer
          </Link>
          <Link href="/analyzed-tweets" className="nav-item transition-colors px-2 py-1" style={navItemStyle}>
            Analyzed Tweets
          </Link>
        </div>

        {/* Theme Toggle (Desktop View) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="flex items-center justify-center p-2 rounded-full focus:outline-none"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <BsSun className="text-black" size={24} />
            ) : (
              <BsMoon className="text-white" size={24} />
            )}
          </button>
        </div>

        {/* Hamburger Menu (Mobile View) */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-black text-foreground dark:text-white flex flex-col items-center md:hidden pb-4">
          <Link href="/" className="nav-item py-4 w-full text-center" style={navItemStyle} onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/tweet-analyzer" className="nav-item py-4 w-full text-center" style={navItemStyle} onClick={toggleMenu}>
            Tweet Analyzer
          </Link>
          <Link href="/analyzed-tweets" className="nav-item py-4 w-full text-center" style={navItemStyle} onClick={toggleMenu}>
            Analyzed Tweets
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
