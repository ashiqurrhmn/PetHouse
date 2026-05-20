"use client";

import { motion } from "framer-motion";
import PetsCard from "./PetsCard";

const PetCardMotion = ({ pets }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet, index) => (
        <motion.div
          key={pet._id}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
          }}
          viewport={{ once: true }}
        >
          <PetsCard pet={pet} />
        </motion.div>
      ))}
    </div>
  );
};

export default PetCardMotion;