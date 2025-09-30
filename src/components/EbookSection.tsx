// components/EbookSection.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Clock, BookOpen, Download, X } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.jpg";

const features = [
  { icon: BookOpen, title: "Comprehensive Guide", description: "200+ pages of in-depth financial education content" },
  { icon: BookOpen, title: "Practical Exercises", description: "Hands-on activities to apply what you learn" },
  { icon: Star, title: "Expert Insights", description: "Tips and strategies from financial professionals" }
];

const EbookSection = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  // URL PDF di folder public
  const ebookURL = "/pdf/SmartMoney.pdf";

  // Image What's Inside
  const insideImage = "../src/assets/komik.jpg"; // ganti dengan path gambar kamu

  return (
    <section id="ebook" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* E-book Preview */}
          <div className="animate-scale-in">
            <Card className="educational-card rounded-xl overflow-hidden shadow-2xl relative">
              <div className="relative">
                <img src={ebookCover} alt="Ebook Cover" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-black/20"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold mb-1 text-pink-400 drop-shadow-lg">
                    Complete Financial Guide
                  </h3>
                  <p className="text-sm text-gray-200 drop-shadow-sm">For Students & Young Adults</p>
                </div>
              </div>

              <CardContent className="p-6 space-y-4 bg-gray-50">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-green-800" /> <span>5,000+ Downloads</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-pink-400 fill-pink-400" /> <span>4.9 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-green-800" /> <span>2-3 Hour Read</span>
                  </div>
                </div>

                {/* Tombol View + Download */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex-1 bg-green-800 hover:bg-green-900 text-white font-bold shadow-lg rounded-lg px-4 py-2 transition-transform hover:scale-105 flex items-center justify-center"
                  >
                    <BookOpen className="mr-2 h-5 w-5" /> View E-book
                  </button>

                  <a
                    href={ebookURL}
                    download
                    className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold shadow-lg rounded-lg px-4 py-2 transition-transform hover:scale-105 flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" /> Download E-book
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl font-extrabold text-pink-400 mb-6">Complete Financial Literacy Guide</h2>
            <p className="text-lg text-gray-700 mb-8">
              Download our comprehensive e-book packed with practical strategies, real-world examples, and actionable tips to master your finances.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 bg-gray-200 rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-100 mb-3">
                    <feature.icon className="h-7 w-7 text-pink-400" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* What's Inside (Image Only) */}
            <Card className="border-2 border-green-800 bg-gray-200 rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Comic Ebook:</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={insideImage}
                  alt="What's Inside Preview"
                  className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => setIsImageOpen(true)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal PDF */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-[60] shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* PDF Viewer */}
            <iframe
              src={ebookURL}
              className="w-full h-full"
              title="E-book Preview"
            />
          </div>
        </div>
      )}

      {/* Modal Image */}
      {isImageOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-[60] shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image Preview */}
            <img
              src={insideImage}
              alt="What's Inside Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EbookSection;
