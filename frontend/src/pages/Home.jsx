import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 animate-fade-in">
              Transform Your Fitness Journey
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              Complete workout plans, personalized diet charts, and comprehensive progress tracking all in one place
            </p>
            {!isAuthenticated && (
              <Link
                to="/signup"
                className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Get Started Free
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive fitness management system designed to help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-6xl mb-6 text-center">💪</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Workout Plans</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Customized workout routines for all fitness levels. From beginner to advanced, find the perfect plan for you.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-6xl mb-6 text-center">🥗</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Diet Plans</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Nutritious meal plans tailored to your goals. Whether you want to lose weight or build muscle, we've got you covered.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="text-6xl mb-6 text-center">📈</div>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Progress Tracking</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Monitor your fitness journey with detailed analytics and beautiful charts. See your progress over time.
            </p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Goal Setting</h4>
            <p className="text-sm text-gray-600">Set and track your fitness goals</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">BMI Calculator</h4>
            <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Membership Plans</h4>
            <p className="text-sm text-gray-600">Choose the plan that fits you</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h4>
            <p className="text-sm text-gray-600">Access anywhere, anytime</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of users achieving their fitness goals</p>
            <Link
              to="/signup"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Sign Up Now - It's Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
