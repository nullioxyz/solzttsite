import TableRow from '@/Components/Category/TableRow';
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
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <TableRow item={item} key={item.id ?? item.slug} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-200 md:hidden">
        {items.map((item) => (
          <div key={item.id ?? item.slug} className="space-y-4 p-5">
            <p className="text-sm font-medium text-slate-800">{item.default_translation?.title || '-'}</p>
            <div className="flex items-center gap-2">
              <Link
                href={route('category.edit', item.slug)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit
              </Link>
              <DeleteButton deleteUrl={route('category.delete', item.slug)} label="Delete category" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
