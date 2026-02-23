export default function SelectDefault(props) {
  const setCategoryValue = (value) => {
    props.handleCategory(value);
  };

  return (
    <div className="relative w-full">
      <select
        className={`h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${props.className || ''}`}
        value={props.selected ?? ''}
        onChange={(e) => setCategoryValue(e.target.value) }
      >
        <option value="">Select</option>

        {props.options.map((option, index) => (
          <option
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
