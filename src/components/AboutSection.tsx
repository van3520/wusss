// components/AboutSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import heroImage from "@/assets/smp.png";
import financeoce from "@/assets/financeoc.jpeg"; // pastikan sesuai ekstensi file

const AboutSection = () => {
const socials = [
{
name: "Instagram 📸",
description: "Check out our fun content and follow us!",
icon: FaInstagram,
link: "https://www.instagram.com/finance_one_club",
gradient: "from-pink-400 via-pink-500 to-pink-600",
animate: "animate-bounce",
},
{
name: "YouTube 🎬",
description: "Watch our cool & educational videos, don't forget to like & subscribe!",
icon: FaYoutube,
link: "https://www.youtube.com/@FinanceOneClub",
gradient: "from-red-400 via-red-500 to-red-600",
animate: "animate-pulse",
},
{
name: "TikTok 🎵",
description: "Short, fun, and engaging finance tips!",
icon: FaTiktok,
link: "https://www.tiktok.com/@financeoneclub",
gradient: "from-black via-gray-800 to-gray-900",
animate: "animate-spin-slow",
},
];


  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 via-pink-50 to-white overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-slow-spin"></div>
      <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-spin-slow"></div>

      <div className="container mx-auto px-4 text-center">
        {/* Logos side by side */}
       {/* Logos side by side */}
       <motion.div
        className="flex flex-col lg:flex-row items-center justify-center gap-10 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        >
        <img
            src={heroImage}
            alt="SMP 1 Bekasi Logo"
            className="w-72 h-auto rounded-lg shadow-lg" // heroImage diperbesar
        />
        <img
            src={financeoce}
            alt="Finance One Club Logo"
            className="w-40 h-auto rounded-lg shadow-lg" // financeoce tetap
        />
        </motion.div>


        {/* About Text */}
        <motion.div
          className="max-w-3xl mx-auto mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-pink-500 to-yellow-400 drop-shadow-lg">
        About <span className="text-pink-600">WUSS</span>
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed text-gray-800">
        WUSS is a fun and easy-to-use app made by the <span className="font-semibold text-green-700">Finance One Club</span> team at <span className="font-extrabold text-pink-500 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">SMPN 1 Bekasi</span>. It helps students like you manage money, save wisely, and learn smart financial habits. 
        <span className="block mt-4">
            Our goal is simple: <span className="font-bold text-pink-500">boost your money skills</span>, <span className="font-bold text-green-700">motivate you to save</span>, and guide you toward a successful financial future.
        </span>
        </p>

        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-green-200 via-pink-200 to-yellow-200 rounded-3xl transform hover:scale-105 transition-transform">
            <CardContent className="p-10 text-center">
              <h3 className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-4">
                Our Mission
              </h3>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                To democratize financial education by making high-quality learning resources accessible to all students, regardless of their background or economic status. We believe that every young person deserves the tools and knowledge to make informed financial decisions.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Media */}
        {/* Social Media */}
        <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        >
        <h3 className="text-4xl font-bold text-green-700 mb-10">
            Follow Us & Stay Fun!
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
            {socials.map((s, i) => (
            <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 3 : -3 }}
                className={`bg-gradient-to-br ${s.gradient} rounded-3xl shadow-2xl p-6 cursor-pointer transform transition-transform duration-300`}
            >
                <CardContent className="text-center">
                <s.icon className={`mx-auto mb-4 text-7xl text-white ${s.animate}`} />
                <h4 className="text-2xl md:text-3xl font-bold mb-2 text-white">{s.name}</h4>
                <p className="text-white/90 text-lg">{s.description}</p>
                </CardContent>
            </motion.a>
            ))}
        </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
