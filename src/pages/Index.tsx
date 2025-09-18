"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import QuizSection from "@/components/QuizSection";
import EbookSection from "@/components/EbookSection";
import AboutSection from "@/components/AboutSection";
import FinancialPlanner from "@/components/FinancialPlanner";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionWrapper = ({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg?: string;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // muncul kalau 20% terlihat
    triggerOnce: false, // biar muncul lagi kalau discroll ke atas
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full my-0 py-0 ${bg ? bg : ""}`}
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="w-full">
        <SectionWrapper bg="bg-gradient-to-b from-blue-50 to-white">
          <Hero />
        </SectionWrapper>

        <SectionWrapper bg="bg-white">
          <VideoSection />
        </SectionWrapper>

        <SectionWrapper bg="bg-gray-50">
          <QuizSection />
        </SectionWrapper>

        {/* <SectionWrapper bg="bg-white">
          <FinancialPlanner />
        </SectionWrapper> */}

        <SectionWrapper bg="bg-gray-50">
          <EbookSection />
        </SectionWrapper>

        <SectionWrapper bg="bg-white">
          <AboutSection />
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
