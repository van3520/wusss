import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, BookOpen, Trophy, ChevronUp } from "lucide-react";
import heroImage from "@/assets/hero-financial-education.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-gray-200 to-green-900 opacity-40"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Main Bubble Text */}
            <motion.div
              className="inline-block text-center"
              initial={{ scale: 0.8, y: -20, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-fredoka leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-green-600 to-gray-400 drop-shadow-lg">
                WISE STUDENT
              </h1>
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold font-fredoka leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-900 via-pink-400 to-green-600 -mt-6 drop-shadow-lg"
                initial={{ y: 20, scale: 0.9, rotate: 5 }}
                animate={{ y: 0, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.2 }}
              >
                DISCIPLINED SAVER
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-2xl font-bold mb-8 max-w-2xl mt-6 text-center"
              style={{
                background: "linear-gradient(90deg, #f687b3, #065f46, #fcd34d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Comic Neue', cursive",
              }}
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              Finance One Club
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button
                onClick={() => scrollToSection("videos")}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg text-lg px-6 py-3 transform hover:scale-105 transition-transform"
              >
                <Play className="mr-2 h-6 w-6" />
                Watch Videos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("quiz")}
                className="border-2 border-green-900 text-green-900 hover:bg-green-900 hover:text-white font-bold rounded-xl px-6 py-3 text-lg"
              >
                <Trophy className="mr-2 h-6 w-6" />
                Take Quiz
              </Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("planning")}
                className="border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white font-bold rounded-xl px-6 py-3 text-lg"
              >
                <BookOpen className="mr-2 h-6 w-6" />
                Financial Planner
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Students learning financial literacy"
                className="w-full h-auto rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 w-24 h-24 flex items-center justify-center bg-pink-200 rounded-xl shadow-md animate-slide-up">
              <BookOpen className="h-8 w-8 text-pink-500" />
            </div>

            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 flex items-center justify-center bg-green-200 rounded-xl shadow-md animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Trophy className="h-8 w-8 text-green-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-pink-400 hover:bg-pink-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </section>
  );
};

export default Hero;
