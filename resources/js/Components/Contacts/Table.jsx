import TableRow from '@/Components/Contacts/TableRow';
import { Link } from '@inertiajs/react';
import { EyeIcon } from '@heroicons/react/24/solid';

export default function Table({ items }) {

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">City</th>
              <th scope="col" className="px-6 py-3">Size</th>
              <th scope="col" className="px-6 py-3">Requested at</th>
              <th scope="col" className="px-6 py-3">Read</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <TableRow item={item} key={item.id} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-200 md:hidden">
        {items.map((item) => (
          <div key={item.id} className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-800">{item.firstname} {item.lastname}</p>
              <span className="text-xs text-slate-500">{item.created_at}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
              <p><span className="font-medium text-slate-700">City:</span> {item.city || '-'}</p>
              <p><span className="font-medium text-slate-700">Size:</span> {item.size || '-'}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="inline-flex rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700">
                {item.read ? 'Read' : 'Not read'}
              </span>
              <Link
                href={route('contact.view', item.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              >
                <EyeIcon className="h-4 w-4" />
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
