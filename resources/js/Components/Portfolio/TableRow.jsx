import { forwardRef } from 'react';
import { PencilSquareIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import DeleteButton from '../Buttons/DeleteButton/Index';

const TableRow = forwardRef(function TableRow(
  { item, index, dragProps, dragHandleProps, dragging },
  ref
) {
  return (
    <tr
      ref={ref}
      {...dragProps}
      className={`border-b border-slate-200 ${
        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
      } ${dragging ? 'ring-2 ring-slate-400' : ''}`}
    >
      {/* Drag handle */}
      <td className="cursor-grab px-6 py-4" {...dragHandleProps} title="Drag to reorder">
        <Bars3Icon className="h-5 w-5 text-slate-400" />
      </td>

      <td className="px-6 py-4 text-slate-700">
        {item.default_translation?.title ?? item.title}
      </td>

      <td className="px-6 py-4">
        <Link
          href={route('portfolio.edit', item.slug)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </Link>
      </td>

      <td className="px-6 py-4">
        <DeleteButton compact deleteUrl={route('portfolio.delete', item.slug)} />
      </td>
    </tr>
  );
});

export default TableRow;
