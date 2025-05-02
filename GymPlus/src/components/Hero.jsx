import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(src/assets/images/hero-bg.jpg)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70"></div>

      {/* Content */}
      <div className="container relative z-10 text-white text-center md:text-left md:max-w-3xl lg:max-w-4xl">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transform Your Body,
          <br />
          <span className="text-primary">Transform Your Life</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-200 max-w-xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join GymPlus today and take the first step towards a healthier,
          stronger, and more confident you with our state-of-the-art facilities
          and expert trainers.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/#membership" className="btn-primary w-full sm:w-auto">
            Start Your Journey
          </Link>
          <Link to="/#programs" className="btn-outline w-full sm:w-auto">
            Explore Programs
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
