import TableRow from '@/Components/Institucional/TableRow';
import { Link } from '@inertiajs/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export default function Table({ items }) {

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3">Id</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Action</th>
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
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">#{item.id}</p>
              <Link
                href={route('institucional.edit', item.slug)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm font-medium text-slate-800">{item.default_translation?.title || '-'}</p>
          </div>
        ))}
      </div>
    </>
  );
}
