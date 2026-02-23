import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react';

export default function BackButton ({  url, text }) {
  return (
    <Link
      href={url}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <span>{text}</span>
    </Link>
  );
};
