import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, Heart, Users, Award, BookOpen } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: GraduationCap,
      title: "Education First",
      description: "We believe financial literacy is fundamental to personal success and empowerment."
    },
    {
      icon: Target,
      title: "Practical Focus",
      description: "Our content is designed to provide actionable skills you can implement immediately."
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "Every resource is crafted with students' unique needs and challenges in mind."
    }
  ];

  

  return (
    <section id="about" className="py-20 bg-gradient-to-r from-pink-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-pink-600 mb-6">About WUSS</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We're passionate about empowering students with the financial knowledge and skills 
            they need to build a secure and prosperous future.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-xl border-0 bg-white rounded-3xl transform hover:scale-105 transition-transform">
            <CardContent className="p-10 text-center">
              <h3 className="text-3xl font-bold text-pink-600 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To democratize financial education by making high-quality learning resources 
                accessible to all students, regardless of their background or economic status. 
                We believe that every young person deserves the tools and knowledge to make 
                informed financial decisions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16 text-center">
          <h3 className="text-4xl font-bold text-green-700 mb-10">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <Card key={i} className="shadow-lg hover:shadow-2xl border-0 rounded-2xl transform hover:scale-105 transition-transform">
                <CardContent className="p-8 text-center">
                  <v.icon className="mx-auto mb-4 text-4xl text-pink-500"/>
                  <h4 className="text-2xl font-semibold mb-2 text-green-800">{v.title}</h4>
                  <p className="text-gray-700">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

       

        {/* Team Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-pink-600 mb-12">Our Approach</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-semibold text-green-800 mb-4">Research-Based Learning</h4>
              <p className="text-gray-700 mb-6">
                Our educational content is developed using evidence-based teaching methods 
                and incorporates the latest research in financial psychology and behavioral economics.
              </p>
              
              <h4 className="text-2xl font-semibold text-green-800 mb-4">Interactive Experience</h4>
              <p className="text-gray-700">
                We believe learning should be engaging and memorable. That's why we use 
                interactive videos, gamified quizzes, and practical exercises to reinforce 
                key concepts.
              </p>
            </div>
            
            <div>
              <Card className="shadow-xl border-0 rounded-3xl transform hover:scale-105 transition-transform">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold text-pink-600 mb-4">Why Choose WUSS?</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-1"></div>
                      Expert-created content reviewed by financial professionals
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-1"></div>
                      Age-appropriate materials designed for students
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-1"></div>
                      Free access to essential financial education resources
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-1"></div>
                      Continuous updates based on user feedback and needs
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
