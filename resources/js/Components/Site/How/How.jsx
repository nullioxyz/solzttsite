import { ReactTyped } from 'react-typed'
import { useTranslation } from 'react-i18next';
export default function How({ texts, warning }) {
  
  const { t } = useTranslation();

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('book');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how" className="flex flex-col justify-between p-5 text-black bg-[#d3c1b2]">
      <div className="max-w-[1240px] h-auto mx-auto mt-44">
        <div className="lg:text-left sm:text-center custom:text-center md:text-center">
          <div className="title uppercase">
            <ReactTyped className='text-5xl tracking-tight' startWhenVisible showCursor={false} strings={[`<h2>${t('how_to_book')}</h2>`]} typeSpeed={40} />
          </div>
        </div>

        {texts && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
            {texts.map((text, index) => (
              <div key={index} className="bg-[#f4f4f4] p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                <h2 className='text-3xl font-bold mb-4'>{text.default_translation.title}</h2>
                <div className="text-[18px] font-light" dangerouslySetInnerHTML={{ __html: text.default_translation.description }} />
              </div>
            ))}
          </div>
        )}

        {warning && (
          <div className='text text-center mt-20' dangerouslySetInnerHTML={{ __html: warning.default_translation.description }} />
        )}

        <div className="flex justify-center mt-20 mb-10">
          <button 
          onClick={scrollToNextSection}
          className="px-6 py-3 bg-[#FFF] text-black text-2xl rounded-full hover:bg-[#7c8f77] hover:text-white transition duration-300 uppercase">
            {t('requestquote')}
          </button>
        </div>
      </div>
    </section>
  )
}