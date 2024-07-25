import React, { useEffect } from 'react';

import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import Works from '@/Components/Site/Works/Works';
import AvailableDesign from '@/Components/Site/AvailableDesign/AvailableDesign';
import Book from '@/Components/Site/Book/Book';
import Call from '@/Components/Site/Call/Call';
import How from '@/Components/Site/How/How';

export default function Index() {

    return (
        <div className="flex flex-col min-h-screen text-white bg-[#7c8f77]">
            <header className="w-full mt-5">
                <Nav />
            </header>

            <main>
                <Highlight />
                <About />
                <Works />
                <AvailableDesign />
                
                {/* <Call text="Como fazer uma tatuagem comigo?" book={false} /> */}
                <How />
                <Book />
            </main>
        </div>
    )
}