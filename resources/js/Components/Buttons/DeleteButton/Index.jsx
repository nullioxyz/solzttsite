import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function DeleteButton ({ deleteUrl, compact = false, label = 'Delete' }) {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(deleteUrl, {
          preserveScroll: true,
          preserveState: false,
          onSuccess: () => {},
        });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className={
        compact
          ? 'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700'
          : 'inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100'
      }
      aria-label={label}
      title={label}
    >
      <TrashIcon className="h-5 w-5" />
      {!compact && <span>{label}</span>}
    </button>
  )
};
