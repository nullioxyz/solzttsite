import TableRow from '@/Components/Institucional/TableRow';

export default function Table({items}) {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Content Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created at
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Updated at
                    </th>
                    <th scope="col" className="px-6 py-3" colSpan={2}>
                        Action
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