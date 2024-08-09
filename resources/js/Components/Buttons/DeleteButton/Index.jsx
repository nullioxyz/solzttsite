import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid'
import Confirmation from '@/Components/Dialogs/Confirmation';
import { Inertia } from '@inertiajs/inertia';

export default function DeleteButton ({  deleteUrl }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    Inertia.delete(deleteUrl, {
      onSuccess: () => {
        setIsDialogOpen(false);
      }
    });
  };

  return (
    <>
      <button onClick={() => setIsDialogOpen(true)} className="flex items-center bg-red-500 text-white mr-5 px-4 py-2 rounded">
        <TrashIcon className="w-5 h-5 mr-2" />
        <span>delete</span>
      </button>

      <Confirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        message="Você tem certeza que deseja excluir este registro?"
      />
    </>
  );
};
