import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import QuizSection from "@/components/QuizSection";
import EbookSection from "@/components/EbookSection";
import AboutSection from "@/components/AboutSection";
import FinancialPlanner from "@/components/FinancialPlanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <QuizSection />
        <FinancialPlanner />
        <EbookSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
