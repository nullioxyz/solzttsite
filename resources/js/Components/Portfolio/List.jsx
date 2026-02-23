import Table from '@/Components/Portfolio/Table';
import { useCallback } from 'react';
import { useReorder } from '@/hooks/useReorder';

export default function List({ items }) {

  const onSave = useCallback((payload) => {
    return axios.post(route("portfolio.sort"), { order: payload });
  }, []);
  
  const { items: rows, onDragEnd, direction } = useReorder(items, {
    onSave,
    idKey: "id",
    sortKey: "order",
    direction: "vertical",
    debounceMs: 0,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table items={rows} onDragEnd={onDragEnd} direction={direction} />
    </div>
  )
}
