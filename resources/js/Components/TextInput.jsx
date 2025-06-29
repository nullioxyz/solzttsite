import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, usedefaultclass = true, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, [isFocused]);

  const defaultClass = 'border-gray-300 rounded-md MontSerratLight shadow-sm text-[#4d4c4c]';

  return (
    <input
      {...props}
      type={type}
      className={usedefaultclass ? `${defaultClass} ${className}` : className}
      ref={input}
    />
  );
});
