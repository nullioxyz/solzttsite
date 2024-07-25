import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react';

export default function BackButton ({  url, text }) {
  return (
    <Link href={url} className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded">
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      <span>{text}</span>
    </Link>
  );
};
