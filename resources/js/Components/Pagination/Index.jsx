import { Link } from "@inertiajs/react";

export default function Pagination({ meta, links }) {
  if (!links || links.length <= 3) return null;

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex w-full justify-between gap-2 sm:hidden">
        <Link
          href={meta?.prev_page_url || "#"}
          preserveScroll
          preserveState
          className={`flex-1 rounded-lg border px-3 py-2 text-center text-sm font-medium ${
            meta?.prev_page_url
              ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              : "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          Previous
        </Link>
        <Link
          href={meta?.next_page_url || "#"}
          preserveScroll
          preserveState
          className={`flex-1 rounded-lg border px-3 py-2 text-center text-sm font-medium ${
            meta?.next_page_url
              ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              : "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          Next
        </Link>
      </div>

      <div className="hidden sm:flex sm:justify-center sm:space-x-1">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.url || "#"}
            preserveScroll
            preserveState
            className={`rounded-lg border px-3 py-2 text-sm font-medium ${
              link.active
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
            } ${!link.url ? "opacity-50 pointer-events-none" : ""}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
}
