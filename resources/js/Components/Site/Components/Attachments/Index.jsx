import { useSelectReferences } from "@/Contexts/SelectReferencesContext"
import { useTranslation } from "react-i18next";

export default function Attachments() {
  const { t } = useTranslation();
  const { selectedReferences, setSelectedReferences } = useSelectReferences();

  return (
    <>
      <div className="mt-20">
        <>
          <div className="title uppercase mb-4">
            <span className="tracking-tighter montSerratMedium text-black">{t('attachments')}</span>
          </div>
          {selectedReferences.map(ref => (
            <div
              key={ref.id}
              className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg border border-gray-300 mb-2"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded object-cover object-center"
                    src={ref.image}
                    alt="gallery-photo"
                  />
                </div>
                <div className="flex-grow">
                  <span className="text-black font-medium montSerratMedium uppercase">
                    {ref.name}
                  </span>
                  <button
                    className="text-[#7d3636] hover:text-[#7d3636] font-bold text-xs block "
                    onClick={() => setSelectedReferences(prevRefs => prevRefs.filter(r => r.id !== ref.id))}
                    aria-label={t('remove')}
                    title={t('remove')}
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </>
      </div>
    </>
  )
}