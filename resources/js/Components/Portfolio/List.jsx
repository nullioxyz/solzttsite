import Table from '@/Components/Portfolio/Table';
import { useState } from 'react';
import { useCallback } from 'react';

export default function List({ items }) {
  const [rows, setRows] = useState(items);

  const persistOrder = useCallback(async (nextRows) => {
    const order = nextRows.map((it, idx) => ({ id: it.id, order: idx + 1 }));
    try {
      await axios.post(route('portfolio.sort'), { order });
    } catch (e) {
      console.error('Falha ao salvar ordem', e);
    }
  }, []);

  const onReorder = useCallback((nextRows) => {
    setRows(nextRows);
    persistOrder(nextRows);
  }, [persistOrder]);

  return (
    <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg">
      <Table items={rows} onReorder={onReorder}/>
    </div>
  )
}