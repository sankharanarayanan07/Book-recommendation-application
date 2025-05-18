import { BookOpen, Users, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">About BookMind</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're passionate about connecting readers with their perfect books through innovative technology and personalized recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <BookOpen className="h-8 w-8 text-purple-600" />,
              title: "Vast Collection",
              description: "Access to millions of books across all genres and languages"
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              title: "Community Driven",
              description: "Join a vibrant community of book lovers and share your thoughts"
            },
            {
              icon: <Star className="h-8 w-8 text-purple-600" />,
              title: "Smart Recommendations",
              description: "Advanced AI-powered system to find your next favorite read"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Our Story</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Founded in 2024, BookMind emerged from a simple idea: making book discovery as intuitive and personal as having a conversation with a knowledgeable friend.
            </p>
            <p className="mb-4">
              Our team of passionate readers and tech enthusiasts work tirelessly to create an experience that combines the joy of traditional bookstores with the convenience of modern technology.
            </p>
            <p>
              We believe that the right book at the right time can change lives, spark creativity, and open new worlds of possibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}