export default function PrimaryButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-flex min-h-11 items-center rounded-xl border border-transparent bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-black focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 ${disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
