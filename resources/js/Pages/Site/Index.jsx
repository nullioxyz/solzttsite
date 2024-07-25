import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import Works from '@/Components/Site/Works/Works';

export default function Index() {
    return (
        <div className="flex flex-col min-h-screen text-white bg-[#000000]">
            <header className="w-full mt-5">
                <Nav />
            </header>

            <main>
                <Highlight />
                <About />
                <Works />
            </main>
        </div>
    )
}