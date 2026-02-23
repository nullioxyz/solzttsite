import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react';

export default function AddButton ({  url }) {
  return (
    <Link
      href={url}
      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black"
    >
      <PlusCircleIcon className="h-5 w-5" />
      <span>New</span>
    </Link>
  );
};
