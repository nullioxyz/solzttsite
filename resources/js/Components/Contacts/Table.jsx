import TableRow from '@/Components/Contacts/TableRow';

export default function Table({ items }) {

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>

          <th scope="col" className="px-6 py-3">
            City
          </th>

          <th scope="col" className="px-6 py-3">
            Size
          </th>

          <th scope="col" className="px-6 py-3">
            Requested at
          </th>

          <th scope="col" className="px-6 py-3">
            Readed
          </th>

          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {items.map((item, index) => {
          return (<TableRow item={item} key={index} />)
        })}
      </tbody>
    </table>
  )
}