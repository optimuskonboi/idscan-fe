import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "3rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "space-around",
};
const loadingCircle = {
  display: "block",
  width: "10px",
  height: "10px",
  backgroundColor: "#3A36DB",
  borderRadius: "0.5rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "60%",
  },
};
const loadingCircleTransition = {
  duration : 0.4,
  yoyo : Infinity,
  ease: 'easeInOut'
}

const Loader = () => {
  return (
    <div>
      <div className="fixed  w-full min-h-screen z-50 bg-black opacity-30" />
      <div className="flex fixed w-full justify-center items-center h-screen">
        <motion.div
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            // transition={loadingCircleTransition}
          
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4
              }}
          ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
           
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4
              }}
          ></motion.span>
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
           
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4
              }}
          ></motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;