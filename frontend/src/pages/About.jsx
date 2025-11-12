const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg mb-6 text-gray-700">
          Welcome to Fitness Management System, your comprehensive solution for achieving your fitness goals.
        </p>
        <p className="text-lg mb-6 text-gray-700">
          We provide personalized workout plans, diet charts, and progress tracking tools to help you
          stay on track and reach your fitness objectives.
        </p>
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg mb-6 text-gray-700">
          To empower individuals to lead healthier lives through accessible fitness and nutrition guidance.
        </p>
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Custom workout plans for all fitness levels</li>
          <li>Personalized diet and nutrition plans</li>
          <li>Real-time progress tracking with charts</li>
          <li>BMI calculator</li>
          <li>Membership plans with exclusive benefits</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

