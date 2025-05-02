import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { programsData } from "../data/programsData";
import Image from "./Image";

const Programs = () => {
  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Fitness Programs
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Expert-designed programs to help you achieve your fitness goals, no
            matter your experience level or fitness ambitions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programsData.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramCard = ({ program, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-56 overflow-hidden">
          <Image
            src={program.image}
            alt={program.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-secondary mb-2">
            {program.title}
          </h3>
          <p className="text-gray-600 mb-4">{program.description}</p>
          <button
            onClick={toggleModal}
            className="flex items-center text-primary font-bold hover:underline"
          >
            Learn More <FaChevronRight className="ml-1" />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-secondary">
                {program.title}
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-secondary"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <Image
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">{program.description}</p>
            </div>
            <div className="mb-6">
              <h4 className="text-lg font-bold text-secondary mb-3">
                Program Features:
              </h4>
              <ul className="space-y-2">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={toggleModal} className="btn-primary w-full">
              Join This Program
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Programs;
