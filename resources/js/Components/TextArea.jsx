import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ isFocused = false, value, className = '', ...props }, ref) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, [isFocused, input]);

  return (
    <textarea
      {...props}
      className={`min-h-[120px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${className}`}
      ref={input}
    >
      {value}
    </textarea>
  );
});
