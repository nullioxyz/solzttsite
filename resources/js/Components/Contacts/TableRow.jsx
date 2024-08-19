import { PencilSquareIcon, EyeIcon } from '@heroicons/react/24/solid'
import DeleteButton from '../Buttons/DeleteButton/Index';
import { Chip } from '@material-tailwind/react';

export default function TableRow({ item }) {

  return (
    <tr className="odd:bg-whit  e odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">
        {item.firstname} {item.lastname}
      </td>

      <td className="px-6 py-4">
        {item.city}
      </td>

      <td className="px-6 py-4">
        {item.size}
      </td>

      <td className="px-6 py-4">
        {item.created_at}
      </td>

      <td className="px-6 py-4">
        {item.read ? (
          <Chip color="green" value="Readed" />

        ): (
          <Chip color="red" value="Not rad" />
        )}
      </td>

      <td className="px-6 py-4">
        <a href={route('contact.view', item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <EyeIcon className="size-6 text-blue-500" />
        </a>
      </td>

    </tr>
  )
}
