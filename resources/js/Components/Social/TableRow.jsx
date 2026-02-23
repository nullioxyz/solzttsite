import { Link } from '@inertiajs/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import DeleteButton from '../Buttons/DeleteButton/Index';

export default function TableRow({ item }) {
  return (
    <tr className="border-b border-slate-200 last:border-b-0 even:bg-slate-50/60">
      <td className="px-6 py-4 text-slate-700">
        {item.name}
      </td>
      <td className="px-6 py-4 text-slate-600">
        {item.url}
      </td>
      <td className="px-6 py-4">
        <Link
          href={route('social.edit', item.name)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </Link>
      </td>
      <td className="px-6 py-4">
        <DeleteButton compact deleteUrl={route('social.delete', item.name)} />
      </td>
    </tr>
  )
}
