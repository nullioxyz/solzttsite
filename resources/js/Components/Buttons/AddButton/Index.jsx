import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react';

export default function AddButton ({  url }) {
  return (
    <Link href={url} className="flex items-center bg-green-500 text-white px-4 py-2 rounded">
      <PlusCircleIcon className="w-5 h-5 mr-2" />
      <span>New</span>
    </Link>
  );
};
