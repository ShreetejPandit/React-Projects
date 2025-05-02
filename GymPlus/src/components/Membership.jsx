import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { membershipData } from "../data/membershipData";

const Membership = () => {
  return (
    <section id="membership" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Membership Plans
          </motion.h2>
          <motion.p
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the perfect membership plan that fits your fitness goals and
            budget. Join our community and start your fitness journey today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipData.map((plan, index) => (
            <MembershipCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MembershipCard = ({ plan, index }) => {
  return (
    <motion.div
      className={`rounded-lg overflow-hidden ${
        plan.isPopular ? "transform md:-translate-y-4" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {plan.isPopular && (
        <div className="bg-primary text-white text-center py-2 font-semibold">
          Most Popular
        </div>
      )}
      <div className={`${plan.color} p-8 h-full flex flex-col`}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-secondary mb-2">
            {plan.title}
          </h3>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-4xl font-bold text-primary">
              {plan.price} ₹
            </span>
            <span className="text-gray-600">/ {plan.duration}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <FaCheck className="text-primary mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`mt-auto ${
            plan.isPopular ? "btn-primary" : "btn-outline"
          } w-full`}
        >
          Sign Up Now
        </button>
      </div>
    </motion.div>
  );
};

export default Membership;
