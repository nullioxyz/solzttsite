import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ isFocused = false, value, ...props }, ref) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <textarea {...props} ref={ref}>
      {value}
    </textarea>
  );
});
