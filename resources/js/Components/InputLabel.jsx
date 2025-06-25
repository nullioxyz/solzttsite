export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-[#e5e7eb] ` + className}>

            {value ? (
                <div dangerouslySetInnerHTML={{ __html: value }} />
            ) : children}
        </label>
    );
}
