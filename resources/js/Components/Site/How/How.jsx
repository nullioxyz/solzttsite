import { useTranslation } from 'react-i18next';

export default function How({ currentLanguage }) {

  const { t } = useTranslation();

  return (
    <section id="how" className="flex flex-col justify-between text-black bg-white">
      <div className="max-w-[1240px] h-auto mx-auto">
        <div className="flex justify-center mb-10">
          <a
            href={route('site.contact', currentLanguage.slug)}
            className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase"
          >
            {t('requestquote')}
          </a>
        </div>
      </div>
    </section>
  )
}