import Table from '@/Components/Contacts/Table';

export default function List({ items }) {

  return (
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <Table items={items} />
    </div>
  )
}