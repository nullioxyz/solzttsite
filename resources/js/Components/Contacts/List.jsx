import Table from '@/Components/Contacts/Table';

export default function List({ items }) {

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table items={items} />
    </div>
  )
}
