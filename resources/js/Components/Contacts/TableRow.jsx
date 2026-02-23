import { Link } from '@inertiajs/react';
import { EyeIcon } from '@heroicons/react/24/solid'

export default function TableRow({ item }) {

  return (
    <tr className="border-b border-slate-200 last:border-b-0 even:bg-slate-50/60">
      <td className="px-6 py-4 text-slate-700">
        {item.firstname} {item.lastname}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {item.city}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {item.size}
      </td>

      <td className="px-6 py-4 text-slate-600">
        {item.created_at}
      </td>

      <td className="px-6 py-4">
        {item.read ? (
          <span className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">Read</span>

        ): (
          <span className="inline-flex rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700">Not read</span>
        )}
      </td>

      <td className="px-6 py-4">
        <Link
          href={route('contact.view', item.id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <EyeIcon className="h-5 w-5" />
        </Link>
      </td>

    </tr>
  )
}
