import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

export default function ImageWithDoubleTap({ children, onDoubleTap, className = "" }) {
  const [showBigHeart, setShowBigHeart] = useState(false);
  const tapRef = useRef({ lastTs: 0, x: 0, y: 0 });
  const lastTriggerRef = useRef(0);

  const triggerDoubleTap = () => {
    const now = Date.now();
    if (now - lastTriggerRef.current < 350) return;

    lastTriggerRef.current = now;
    if (onDoubleTap) {
      onDoubleTap();
    }

    setShowBigHeart(true);
    setTimeout(() => setShowBigHeart(false), 600);
  };

  const handleDoubleClick = () => {
    triggerDoubleTap();
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) {
      tapRef.current = { lastTs: 0, x: 0, y: 0 };
      return;
    }

    const touch = e.touches[0];
    const now = Date.now();
    const dt = now - tapRef.current.lastTs;
    const dx = Math.abs(touch.clientX - tapRef.current.x);
    const dy = Math.abs(touch.clientY - tapRef.current.y);

    // Só considera double tap quando os toques são próximos em tempo e posição.
    if (dt > 0 && dt < 280 && dx < 14 && dy < 14) {
      triggerDoubleTap();
      tapRef.current = { lastTs: 0, x: 0, y: 0 };
      return;
    }

    tapRef.current = {
      lastTs: now,
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  return (
    <div className={`relative ${className}`} onDoubleClick={handleDoubleClick} onTouchStart={handleTouchStart}>
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
