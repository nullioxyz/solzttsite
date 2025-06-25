import GB from 'country-flag-icons/react/3x2/GB';
import BR from 'country-flag-icons/react/3x2/BR';
import IT from 'country-flag-icons/react/3x2/IT';

export default function CurrentLanguage({ currentLanguage, defaultLang }) {
  
  const languageToShow = currentLanguage.slug || defaultLang.slug;
  const languageName = currentLanguage ? currentLanguage.name : defaultLang.name;

  return (
    <div className='flex p-0'>
      {languageToShow === 'pt' && (
        <>
          <BR title={languageName} className='w-6 mt-[-3px]' />
        </>
      )}

      {languageToShow === 'it' && (
        <>
          <IT title={languageName} className='w-6 mt-[-3px]' />
        </>
      )}

      {languageToShow === 'en' && (
        <>
          <GB title={languageName} className='w-6 mt-[-3px]' />
        </>
      )}
    </div>
  );
}
