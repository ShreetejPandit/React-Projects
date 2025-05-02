import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { trainersData } from "../data/trainersData";
import Image from "./Image";

const Trainers = () => {
  return (
    <section id="trainers" className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Meet Our Expert Trainers
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our certified trainers are dedicated to helping you achieve your
            fitness goals through personalized guidance and motivation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainersData.map((trainer, index) => (
            <TrainerCard key={trainer.id} trainer={trainer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TrainerCard = ({ trainer, index }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-64 overflow-hidden">
        <Image
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary">{trainer.name}</h3>
        <p className="text-primary font-medium mb-3">{trainer.specialty}</p>
        <p className="text-gray-600 mb-4">{trainer.bio}</p>

        <div className="flex items-center gap-4">
          <a
            href={trainer.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label={`${trainer.name}'s Instagram`}
          >
            <FaInstagram size={20} />
          </a>
          <a
            href={trainer.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label={`${trainer.name}'s Twitter`}
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={trainer.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
            aria-label={`${trainer.name}'s Facebook`}
          >
            <FaFacebookF size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Trainers;
