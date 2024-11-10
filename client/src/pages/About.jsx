/* eslint-disable react/no-unescaped-entities */
import aboutImg from "../assets/images/about_img.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full flex justify-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <motion.div
        className="w-[90%] max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.h1 
          className="text-5xl text-center font-extrabold text-indigo-600"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>

        {/* Mission Statement Section */}
        <div className="text-center px-4 text-lg text-gray-700 leading-relaxed">
          <p>
            Welcome to <span className="font-bold text-indigo-600">Dream Comes True</span> – where we make your travel dreams a reality.
            Our mission is to empower travelers to explore the world confidently by providing easy, accessible, and enjoyable
            travel planning services.
          </p>
          <p className="mt-4">
            From scenic getaways to life-changing adventures, we are here to make sure that each journey is unique, memorable, and
            as stress-free as possible.
          </p>
        </div>

        {/* Image and Team Intro */}
        <div className="flex flex-col items-center">
          <motion.img
            src={aboutImg} 
            className="w-48 h-48 rounded-full shadow-md mb-4" 
            alt="Dream Comes True Team"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.h2 
            className="text-3xl font-semibold text-center text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Meet the Dream Team
          </motion.h2>
          <p className="text-center text-gray-600 mt-2 px-6">
            Our dedicated team of travel experts and support staff is passionate about making each journey special.
            We're here to guide you every step of the way.
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-indigo-100 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Our Services</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Custom trip planning tailored to your preferences</li>
            <li>• Easy booking for flights, hotels, and experiences</li>
            <li>• 24/7 customer support for a smooth and secure journey</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mt-6">
          <a
            href="https://github.com/DreamComesTrue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            GitHub <FaExternalLinkAlt />
          </a>
          <a
            href="https://linkedin.com/in/dream-comes-true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            LinkedIn <FaExternalLinkAlt />
          </a>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-50 rounded-xl p-6 mt-8 shadow-inner">
          <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-4">What Our Clients Say</h3>
          <div className="space-y-6">
            <blockquote className="text-center italic text-gray-600">"Dream Comes True made my honeymoon unforgettable. Everything was seamless and worry-free!"</blockquote>
            <blockquote className="text-center italic text-gray-600">"Thanks to their team, my solo adventure to Japan was a dream come true!"</blockquote>
            <blockquote className="text-center italic text-gray-600">"They took care of everything, allowing us to focus on enjoying our vacation!"</blockquote>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="/"
            className="bg-indigo-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-500"
          >
            Start Your Dream Journey
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
