import { FC } from "react";
import { motion } from "framer-motion";

interface TagProps {
  text: string;
}

const Tag: FC<TagProps> = ({ text }) => {
  return (
    <motion.div
      className="absolute bg-[#18181B] w-fit top-10 text-sm text-center p-1 rounded-md z-40 text-nowrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {text}
    </motion.div>
  );
};

export default Tag;
