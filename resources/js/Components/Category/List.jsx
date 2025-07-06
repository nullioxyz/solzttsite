import Table from '@/Components/Category/Table';

export default function List({ items }) {

  return (
    <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg">
      <Table items={items} />
    </div>
  )
}