"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { animate, stagger } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import ThemeToggle from "@/components/ui/themeswitcher";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setIsScrolled(currentScrollPos > 50);
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen) {
      const navItems = document.querySelectorAll('.nav-item');
      animate(navItems, { opacity: [0, 1], y: [-10, 0] }, { duration: 0.3, delay: stagger(0.05) });
    }
  }, [isOpen]);

  const navItemStyle = {
    color: 'inherit',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
    fontSize: '0.75rem',
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-background dark:bg-background-dark shadow-lg'
          : 'bg-transparent'
      } ${!isVisible ? '-top-20' : 'top-0'} text-foreground dark:text-white`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="nav-item transition-colors px-4 py-2 text-2xl font-bold text-foreground dark:text-white"
          >
            Xamined
          </Link>
          <div className="ml-4 md:hidden">
            <ThemeToggle />
          </div>
          <div className="flex-1 flex justify-center items-center space-x-4">
  <Link href="/" className="nav-item transition-colors px-2 py-1" style={navItemStyle}>Home</Link>
  <Link href="/tweet-analyzer" className="nav-item transition-colors px-2 py-1" style={navItemStyle}>Tweet Analyzer</Link>
  <Link href="/analyzed-tweets" className="nav-item transition-colors px-2 py-1" style={navItemStyle}>Analyzed Tweets</Link>
</div>

        </div>
        <div className="flex-grow"></div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="text-foreground dark:text-white focus:outline-none">
            <FaBars size={24} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background bg-opacity-100 dark:bg-background-dark text-foreground dark:text-white flex flex-col items-center md:hidden pb-4">
          <Link href="/" className="nav-item py-4 w-full text-center" style={navItemStyle} onClick={toggleMenu}>Home</Link>
          <Link href="/tweet-analyzer" className="nav-item py-4 w-full text-center" style={navItemStyle} onClick={toggleMenu}>Tweet Analyzer</Link>
          <Link href="/analyzed-tweets" className="nav-item py-4 w-full text-center" style={navItemStyle} onClick={toggleMenu}>Analyzed Tweets</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
