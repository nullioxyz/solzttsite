import GB from 'country-flag-icons/react/3x2/GB';
import BR from 'country-flag-icons/react/3x2/BR';
import IT from 'country-flag-icons/react/3x2/IT';

export default function CurrentLanguage({ currentLanguage, defaultLang }) {
  
  const languageToShow = currentLanguage.slug || defaultLang.slug;
  const languageName = currentLanguage ? currentLanguage.name : defaultLang.name;

  return (
    <div className='flex space-x-4 items-center'>
      {languageToShow === 'pt' && (
        <>
          <BR title={languageName} className='w-8' />
          <span className='normal-case'>{languageName}</span>
        </>
      )}

      {languageToShow === 'it' && (
        <>
          <IT title={languageName} className='w-8' />
          <span className='normal-case'>{languageName}</span>
        </>
      )}

      {languageToShow === 'en' && (
        <>
          <GB title={languageName} className='w-8' />
          <span className='normal-case'>{languageName}</span>
        </>
      )}
    </div>
  );
}
