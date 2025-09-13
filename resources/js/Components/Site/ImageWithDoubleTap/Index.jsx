import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

export default function ImageWithDoubleTap({ children, onDoubleTap }) {
  const [showBigHeart, setShowBigHeart] = useState(false);

  const handleDoubleClick = () => {
    // dispara callback opcional
    if (onDoubleTap) {
      onDoubleTap();
    }

    // controla animação
    setShowBigHeart(true);
    setTimeout(() => setShowBigHeart(false), 600);
  };

  return (
    <div className="relative" onDoubleClick={handleDoubleClick}>
      {children}

      <AnimatePresence>
        {showBigHeart && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BookmarkSolid className="w-24 h-24 text-orange-600 drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
