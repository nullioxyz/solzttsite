import { useEffect, useRef } from "react";

export default function InputRadio({ className = '', isFocused = false, usedefaultclass = true, ...props }) {

  const input = useRef();

  useEffect(() => {

    if (isFocused) {
      input.current.focus();
    }
  }, [isFocused]);

  const defaultClass = 'h-4 w-4 border-gray-300 text-[#4d4c4c]';

  return (
    <input
      {...props}
      type="radio"
      className={usedefaultclass ? `${defaultClass} ${className}` : className}
      ref={input}
    />
  );
}
