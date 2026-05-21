"use client";

import { motion } from "framer-motion";
import PetsCard from "./PetsCard";

const FeaturedCardMotion = ({ pet, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      viewport={{ once: false }}
    >
      <PetsCard pet={pet} />
    </motion.div>
  );
};

export default FeaturedCardMotion;