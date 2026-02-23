import Table from '@/Components/AvailableDesign/Table';
import { useReorder } from '@/hooks/useReorder';
import axios from 'axios';
import { useCallback } from 'react';

export default function List({ items }) {
  const onSave = useCallback((payload) => {
    return axios.post(route("available_design.sort"), { order: payload });
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
