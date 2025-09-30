// components/EbookSection.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, Clock, BookOpen, Download, X } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.jpg";

const EbookSection = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const ebookURL = "/pdf/SmartMoney.pdf";
  const insideImage = "/komik.jpg";

  // Fungsi download PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = ebookURL;
    link.download = "SmartMoney.pdf";
    link.click();
  };

  return (
    <section id="ebook" className="py-20 bg-gray-100 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-200 rounded-full opacity-10 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-300 rounded-full opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* E-book Preview */}
          <div className="animate-scale-in relative">
            <Card className="rounded-xl overflow-hidden shadow-2xl relative hover:shadow-3xl transition-shadow duration-300">
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                Bestseller
              </div>

              <div className="relative">
                <img src={ebookCover} alt="Ebook Cover" className="w-full h-96 object-cover rounded-t-xl" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-black/20 rounded-b-xl"></div>
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

                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold shadow-lg rounded-lg px-4 py-2 transition-transform hover:scale-105 flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5" /> Download E-book
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl font-extrabold text-pink-400 mb-6">
              Financial Literacy Guide for Middle School Students
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Get this easy-to-read e-book that helps you learn how to manage your pocket money, save wisely, and understand basic finance in a fun and simple way.
            </p>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-center">
                <Star className="text-pink-400 mr-2" /> How to save and manage pocket money
              </li>
              <li className="flex items-center">
                <BookOpen className="text-green-800 mr-2" /> Understanding needs vs wants
              </li>
              <li className="flex items-center">
                <Clock className="text-yellow-500 mr-2" /> Tips for making smart purchases
              </li>
              <li className="flex items-center">
                <Users className="text-green-800 mr-2" /> How to create a simple money plan
              </li>
            </ul>

            {/* What's Inside (Image Only) */}
            <Card className="border-2 border-green-800 bg-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Comic Ebook Preview:</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={insideImage}
                  alt="What's Inside Preview"
                  className="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
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
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-[60] shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>
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
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageOpen(false)} // klik di backdrop menutup modal
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()} // klik di image tidak menutup modal
          >
            {/* Close Button */}
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-[60] shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

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
