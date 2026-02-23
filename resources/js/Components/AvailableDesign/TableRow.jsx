import { Bars3Icon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react';
import DeleteButton from '../Buttons/DeleteButton/Index';
import { forwardRef, useEffect, useState } from 'react';
import request from '@/Services/requests';

function InlineSwitch({ checked, loading, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={loading}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-12 items-center rounded-full border transition ${
        checked
          ? 'border-emerald-500 bg-emerald-500/20'
          : 'border-slate-300 bg-slate-200/70'
      } ${loading ? 'opacity-60' : ''}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

const TableRow = forwardRef(function TableRow(
  { item, index, dragProps, dragHandleProps, dragging },
  ref
) {
  const [available, setAvailable] = useState(Boolean(item.available));
  const [active, setActive] = useState(Boolean(item.active));
  const [loadingKey, setLoadingKey] = useState(null);

  useEffect(() => {
    setAvailable(Boolean(item.available));
    setActive(Boolean(item.active));
  }, [item.available, item.active, item.id]);

  const toggleAvailability = async () => {
    const nextValue = !available;
    setLoadingKey('available');
    setAvailable(nextValue);

    try {
      await request.post(route('available_design.changeAvailability', item.slug), {
        available: nextValue,
      });
    } catch (error) {
      setAvailable(!nextValue);
    } finally {
      setLoadingKey(null);
    }
  };

  const toggleActive = async () => {
    const nextValue = !active;
    setLoadingKey('active');
    setActive(nextValue);

    try {
      await request.post(route('available_design.changeActive', item.slug), {
        active: nextValue,
      });
    } catch (error) {
      setActive(!nextValue);
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <tr  ref={ref}
      {...dragProps}
      className={`border-b border-slate-200 ${
        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
      } ${dragging ? 'ring-2 ring-slate-400' : ''}`}>
      {/* Drag handle */}
      
      <td className="cursor-grab px-6 py-4" {...dragHandleProps} title="Drag to reorder">
        <Bars3Icon className="h-5 w-5 text-slate-400" />
      </td>

      <td className="px-6 py-4 text-slate-700">
        {item.default_translation.title}
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <InlineSwitch
            checked={available}
            loading={loadingKey === 'available'}
            onToggle={toggleAvailability}
          />
          <span className="text-xs font-medium text-slate-600">{available ? 'Available' : 'Unavailable'}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <InlineSwitch
            checked={active}
            loading={loadingKey === 'active'}
            onToggle={toggleActive}
          />
          <span className="text-xs font-medium text-slate-600">{active ? 'Active' : 'Inactive'}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <Link
          href={route('available_design.edit', item.slug)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </Link>
      </td>

      <td className="px-6 py-4">
        <DeleteButton compact deleteUrl={route('available_design.delete', item.slug)} />
      </td>  
    </tr>
  );
});

export default TableRow;
