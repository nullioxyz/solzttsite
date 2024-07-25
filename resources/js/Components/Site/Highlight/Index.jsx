import Logo from '@/Components/Site/Logo/Logo';

export default function Highlight() {
    return (
        <section className="flex flex-col justify-between items-center max-w-[1240px] mx-auto text-white" id="highlight">
            <div className="highlight flex justify-center items-center">
                <Logo />
            </div>
            <div className="animate-bounce mt-40 cursor-pointer">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </section>
    );
}