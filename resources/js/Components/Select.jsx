import { forwardRef, useRef } from 'react';

export default forwardRef(function Select({ options = [], className = '', ...props}, ref) {
    const select = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={select}
        >
            <option value="">Select</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label} - {option.value}
                </option>
            ))}
        </select>
    );
})