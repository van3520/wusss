import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, Star, X } from "lucide-react";

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w-]{11})/);
    return match ? match[1] : null;
  };

  const videosRaw = [
    {
      title: "Setting Financial Goals",
      url: "https://www.youtube.com/watch?v=v-mlEQ7KW5Q",
      description: "Learn how to set realistic financial goals and create actionable plans.",
      duration: "15 min",
      views: "2.1k",
      rating: 4.7,
      isNew: false
    },
    {
      title: "Understanding Interest & Compound Growth",
      url: "https://www.youtube.com/watch?v=NfurkrZEn3Q",
      description: "Explore how interest works and the power of compound growth over time.",
      duration: "14 min",
      views: "1.9k",
      rating: 4.8,
      isNew: false
    },
    {
      title: "Banking Basics for Students",
      url: "https://www.youtube.com/watch?v=GZ7y-yFdX9M",
      description: "Everything you need to know about choosing and using bank accounts.",
      duration: "11 min",
      views: "2.7k",
      rating: 4.6,
      isNew: false
    },{
      title: "Savings Basics: Getting Started",
      url: "https://youtu.be/U5cssZCvmso?si=Y1PLs62L0Y4UU9fn",
      description: "Learn the fundamentals of saving money and building healthy financial habits.",
      duration: "8 min",
      views: "2.5k",
      rating: 4.9,
      isNew: true
    },
    {
      title: "Building Your Emergency Fund",
      url: "https://www.youtube.com/watch?v=wm73kfEjBUY",
      description: "Discover how to create and maintain an emergency fund for financial security.",
      duration: "12 min",
      views: "1.8k",
      rating: 4.8,
      isNew: true
    },
    {
      title: "Smart Spending Strategies",
      url: "https://youtu.be/a81bXkES-gg?si=HKG7pCqmcrOz44iq",
      description: "Master the art of distinguishing between needs and wants in your spending.",
      duration: "10 min",
      views: "3.2k",
      rating: 4.9,
      isNew: false
    }
  ];

  const videos = videosRaw.map((v, index) => {
    const id = getYouTubeId(v.url);
    return {
      id: index + 1,
      ...v,
      youtubeId: id,
      thumbnail: id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
    };
  });

  const videosToShow = showAll ? videos : videos.slice(0, 3);

  return (
    <section id="videos" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pink-500 mb-4">Educational Videos</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Fun and interactive video lessons designed to build your financial literacy step by step!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videosToShow.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-t-2xl" />

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    className="rounded-full w-16 h-16 p-0 bg-pink-400 hover:bg-pink-500 text-white shadow-md"
                    onClick={() => setSelectedVideo(video.youtubeId)}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>

                {video.isNew && (
                  <div className="absolute top-3 left-3 bg-pink-400 text-white font-bold text-xs px-2 py-1 rounded-full animate-bounce">
                    NEW
                  </div>
                )}

                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-green-900 text-white px-2 py-1 rounded-full text-sm">
                    {video.duration}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-500 transition-colors">
                  {video.title}
                </h3>

                {video.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    {video.views && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-pink-400" /> {video.views}
                      </div>
                    )}
                    {video.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" /> {video.rating}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white rounded-full"
                    onClick={() => setSelectedVideo(video.youtubeId)}
                  >
                    Watch Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol View More / Hide Videos */}
        {videos.length > 3 && (
          <div className="text-center mt-12">
            <Button className="bg-green-900 text-white hover:bg-green-800 rounded-full px-6 py-3" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Hide Videos" : "View All Videos"}
            </Button>
          </div>
        )}
      </div>

      {/* Modal Video */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-full max-w-3xl mx-4">
            <Button
              className="absolute top-2 right-2 text-white hover:text-pink-400 z-50"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
