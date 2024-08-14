import React, { useEffect } from 'react';

import Nav from '@/Components/Site/Nav/Index';
import Highlight from '@/Components/Site/Highlight/Index';
import About from '@/Components/Site/About/About';
import Works from '@/Components/Site/Works/Works';
import AvailableDesign from '@/Components/Site/AvailableDesign/AvailableDesign';
import Book from '@/Components/Site/Book/Book';
import How from '@/Components/Site/How/How';

export default function Index({ institucional }) {
    return (
        <div className="flex flex-col min-h-screen text-white bg-[#7c8f77]">
            <header className="w-full mt-5">
                <Nav />
            </header>

            <main>
                <Highlight />
                <About institucional={institucional} />
                <Works />
                <AvailableDesign />
                <How />
                <Book />
            </main>
        </div>
    )
}