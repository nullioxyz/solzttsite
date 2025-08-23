import { Bars3Icon, PencilSquareIcon } from '@heroicons/react/24/solid'
import DeleteButton from '../Buttons/DeleteButton/Index';
import { Chip } from "@material-tailwind/react";
import { forwardRef } from 'react';

const TableRow = forwardRef(function TableRow(
  { item, index, dragProps, dragHandleProps, dragging },
  ref
) {

  return (
    <tr  ref={ref}
      {...dragProps}
      className={`border-b dark:border-gray-700 ${
        index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
      } ${dragging ? 'ring-2 ring-indigo-400' : ''}`}>
      {/* Drag handle */}
      
      <td className="px-6 py-4 cursor-grab" {...dragHandleProps} title="Arraste para reordenar">
        <Bars3Icon className="w-5 h-5 text-gray-400" />
      </td>

      <td className="px-6 py-4">
        {item.default_translation.title}
      </td>
      
      <td className="px-6 py-4">
        {item.available ? (
          <Chip color="green" value="Available" />
        ) : (
          <Chip color="red" value="Unavailable" />
        )}
      </td>

      <td className="px-6 py-4">
        {item.active ? (
          <Chip color="green" value="Active" />
        ) : (
          <Chip color="red" value="Inactive" />
        )}
      </td>
      <td className="px-6 py-4">
        <a href={ route('available_design.edit', item.slug) } className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <PencilSquareIcon className="size-6 text-blue-500" />
        </a>
      </td>

      <td className="px-6 py-4">
        <DeleteButton deleteUrl={route('available_design.delete', item.slug)} />
      </td>  
    </tr>
  );
});

export default TableRow;