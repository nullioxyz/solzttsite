import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid'
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function DeleteButton ({  deleteUrl }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          onSuccess: () => {
            setIsDialogOpen(false);
          }
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
    <>
      <button onClick={() => handleDelete()} className="flex items-center bg-red-500 text-white mr-5 px-4 py-2 rounded">
        <TrashIcon className="w-5 h-5 mr-2" />
        <span>delete</span>
      </button>
    </>
  );
};
