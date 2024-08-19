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

  const defaultClass = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm';

  return (
    <input
      {...props}
      type={type}
      className={usedefaultclass ? `${defaultClass} ${className}` : className}
      ref={input}
    />
  );
});
