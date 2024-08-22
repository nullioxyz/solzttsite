import Logo from '@/Components/Site/Logo/Logo';

export default function Highlight() {

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col items-center max-w-[1240px] mx-auto text-white" id="highlight">
      <div className="highlight mt-20">
        <Logo />
      </div>
      <div className="animate-bounce lg:mt-[-50px] md:mt-[-40px] xs:mt-20 custom:mt-64 cursor-pointer" onClick={scrollToNextSection}>
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </section>
  );
}