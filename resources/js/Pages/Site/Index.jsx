import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';

export default function Index() {
    return (
        <div className="flex flex-col min-h-screen text-white bg-[#000000]">
            <header className="w-full mt-5">
                <Nav />
            </header>

            <main className="flex-grow flex flex-col justify-center items-center space-y-20">
                <Highlight />
                <About />
            </main>
        </div>
    )
}