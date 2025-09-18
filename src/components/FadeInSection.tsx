import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInSectionProps {
  children: ReactNode;
}

const FadeInSection = ({ children }: FadeInSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
