import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logoImage from "@/assets/wuss.jpeg";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gray-300/95 backdrop-blur-sm border-b border-gray-400 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-green-900 flex items-center justify-center relative overflow-hidden">
            {/* Animated Image */}
            <motion.img
              src={logoImage} // ganti dengan path gambar
              alt="W Logo"
              className="w-6 h-6 object-contain"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            />
          </div>


          {/* Animated WUSS Text */}
          <motion.span
            className="text-xl font-bold tracking-wide"
            style={{
              background: "linear-gradient(to right, #f687b3, #065f46)", // pink → hijau tua
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
          >
            WUSS
          </motion.span>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("videos")}
            className="text-gray-800 hover:text-pink-400 transition-colors font-semibold"
          >
            Videos
          </button>
          <button
            onClick={() => scrollToSection("quiz")}
            className="text-gray-800 hover:text-pink-400 transition-colors font-semibold"
          >
            Quiz
          </button>
          <button
            onClick={() => scrollToSection("ebook")}
            className="text-gray-800 hover:text-pink-400 transition-colors font-semibold"
          >
            E-book
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-800 hover:text-pink-400 transition-colors font-semibold"
          >
            About Us
          </button>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button
            onClick={() => scrollToSection("videos")}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg"
          >
            Start Learning
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t border-gray-400 pt-4">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("videos")}
              className="text-left text-gray-800 hover:text-pink-400 transition-colors font-semibold"
            >
              Videos
            </button>
            <button
              onClick={() => scrollToSection("quiz")}
              className="text-left text-gray-800 hover:text-pink-400 transition-colors font-semibold"
            >
              Quiz
            </button>
            <button
              onClick={() => scrollToSection("ebook")}
              className="text-left text-gray-800 hover:text-pink-400 transition-colors font-semibold"
            >
              E-book
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-gray-800 hover:text-pink-400 transition-colors font-semibold"
            >
              About Us
            </button>
            <Button
              onClick={() => scrollToSection("videos")}
              className="bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg w-full mt-4"
            >
              Start Learning
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
