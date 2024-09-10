import { PencilSquareIcon } from '@heroicons/react/24/solid'
import DeleteButton from '../Buttons/DeleteButton/Index';

export default function TableRow({ item }) {
  return (
    <tr className="odd:bg-whit  e odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        {item.name}
      </td>
      <td className="px-6 py-4">
        {item.url}
      </td>
      <td className="px-6 py-4">
        <a href={ route('social.edit', item.name) } className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <PencilSquareIcon className="size-6 text-blue-500" />
        </a>
      </td>
      <td className="px-6 py-4">
        <DeleteButton deleteUrl={route('social.delete', item.name)} />
      </td>
    </tr>
  )
}