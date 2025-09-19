export default function SelectDefault(props) {
  const setCategoryValue = (value) => {
    props.handleCategory(value);
  }

  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <select
        className="h-full w-full rounded-[7px] border text-sm font-normal"
        onChange={(e) => setCategoryValue(e.target.value) }
        >
        <option value="">Select</option>
        
        {props.options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            selected={props.selected === option.value}
            >
              {option.label}
          </option>
        ))}
      </select>
    </div>
  );   
}