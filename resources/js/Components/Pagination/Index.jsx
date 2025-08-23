import { Link } from "@inertiajs/react";

export default function Pagination({ meta, links }) {
  if (!links || links.length <= 3) return null;

  return (
    <div className="mt-6 flex justify-center">
      {/* Versão mobile: só anterior/próximo */}
      <div className="flex w-full justify-between sm:hidden px-2">
        <Link
          href={meta?.prev_page_url || "#"}
          preserveScroll
          preserveState
          className={`px-3 py-2 text-sm font-medium rounded-md border ${
            meta?.prev_page_url
              ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              : "bg-gray-100 text-gray-400 border-gray-200 pointer-events-none"
          }`}
        >
          Anterior
        </Link>
        <Link
          href={meta?.next_page_url || "#"}
          preserveScroll
          preserveState
          className={`px-3 py-2 text-sm font-medium rounded-md border ${
            meta?.next_page_url
              ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              : "bg-gray-100 text-gray-400 border-gray-200 pointer-events-none"
          }`}
        >
          Próximo
        </Link>
      </div>

      {/* Versão desktop: lista completa */}
      <div className="hidden sm:flex sm:space-x-1">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.url || "#"}
            preserveScroll
            preserveState
            className={`px-3 py-2 rounded-md border text-sm font-medium ${
              link.active
                ? "bg-gray-500 text-white border-gray-400"
                : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
            } ${!link.url ? "opacity-50 pointer-events-none" : ""}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </div>
  );
}
