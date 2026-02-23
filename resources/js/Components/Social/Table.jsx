import TableRow from '@/Components/Social/TableRow';
import { Link } from '@inertiajs/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import DeleteButton from '../Buttons/DeleteButton/Index';

export default function Table({ items }) {

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">URL</th>
              <th scope="col" className="px-6 py-3" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <TableRow item={item} key={item.id ?? item.name} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-200 md:hidden">
        {items.map((item) => (
          <div key={item.id ?? item.name} className="space-y-4 p-5">
            <p className="text-sm font-semibold text-slate-800">{item.name || '-'}</p>
            <p className="break-all text-sm text-slate-600">{item.url || '-'}</p>
            <div className="flex items-center gap-2">
              <Link
                href={route('social.edit', item.name)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </Link>
              <DeleteButton deleteUrl={route('social.delete', item.name)} label="Delete social" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
