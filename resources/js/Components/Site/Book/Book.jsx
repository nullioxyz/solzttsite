import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from "react-typed";
import { IconButton } from '@material-tailwind/react';

const questions = [
    { id: 1, text: "Qual é o seu nome?" },
    { id: 2, text: "Qual é a sua idade?" },
    { id: 3, text: "Qual é o seu email?" },
  ];

export default function Book () {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
  
    const handleNext = () => {
      setCurrentStep(currentStep + 1);
    };
  
    const handleBack = () => {
      setCurrentStep(currentStep - 1);
    };
  
    const handleChange = (e) => {
      setAnswers({ ...answers, [questions[currentStep].id]: e.target.value });
    };
  
    const isLastStep = currentStep === questions.length - 1;

    return (
        <section id="book" className="flex flex-col justify-between max-w-[1240px] h-auto mx-auto p-5 mt-10 text-white">
            <div className="text-left">
                <div className="title uppercase">
                    <ReactTyped className='text-5xl tracking-tight' startWhenVisible showCursor={false} strings={["<h2>Request a Tattoo Quote</h2>"]} typeSpeed={40} />
                </div>
            </div>

            <div className="flex">
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                    <div className="information m-10 lg:mt-20 md:mt-10 sm:mt-5">
                        <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                            <ol className='list-disc pl-5 text-justify'>
                                <li>The first is if you identify with any available artwork. If that's the case, please send me a photo of the design you're interested in, and we'll study it to adapt it to you.</li>
                                <li>The other way is to develop a completely unique project based on your ideas in my style. I'll explain the details later.</li>
                            </ol>
                        </div>

                        <div className="title uppercase mt-20">
                            <h2 className='text-[37px] tracking-tighter'>Criative process</h2>
                        </div>

                        <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                            <p className='text-justify'>
                                All my artworks are unique and tattooed only once. I'll create your art according to your ideas, considering the feelings involved in the symbols, the reliefs, and movements of your body to obtain a harmonious and unique design like you. To develop a design, I ask for a minimum of 1 week to understand your idea, absorb the theme, and produce it. During the process, we'll be in touch so you can participate in the project, making the art a collaboration between you and me.
                            </p>
                        </div>

                        <div className="title uppercase mt-20">
                            <h2 className='text-[37px] tracking-tighter'>Considerations</h2>
                        </div>

                        <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                            <ul className='list-disc pl-5 text-justify'>
                                <li>I don't tattoo artwork from other tattoo artists and artists.</li>
                                <li>I don't create designs to be tattooed by other tattoo artists.</li>
                                <li>I don't tattoo minors under 18 years old.</li>
                                <li>All artworks are exclusive and tattooed only once.</li>
                            </ul>
                        </div>

                        <div className="title uppercase mt-20">
                            <h2 className="text-[37px] tracking-tighter">
                                PAYMENT METHODS
                            </h2>
                        </div>

                        <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                            <p className="text-justify">
                            Once we agree on the tattoo's value, a 30% advance payment will be required to secure the appointment and start preparations. On the day of the tattoo, the remaining 70% will be paid. In case of changes in the tattoo's size, the value will be adjusted. Please note that the advance payment will not be refunded in case of cancellation. As for payments, both the advance and the remainder can be made by bank transfer, or  cash on the day of the session. I'm available to clarify any doubts.
                            </p>
                        </div>
                    </div>

                    <div className="form lg:mt-20 md:mt-10 sm:mt-5 p-5">
                        <form>
                            <div className="flex flex-wrap space-y-5">
                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="email">
                                        Your tattoo idea
                                    </label>
                                    <div class="mt-2">
                                        <textarea id="about" name="about" rows="3" class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"></textarea>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="email">
                                        Examples of my portfolio and other references
                                    </label>
                                    <div class="mt-2">
                                        <textarea id="about" name="about" rows="3" class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"></textarea>
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="lastname">
                                        Size in centimeters
                                    </label>

                                    <div className="space-y-6 mb-5">
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-everything" className="block text-lg font-medium leading-6">Up to 15cm</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-email" className="block text-lg font-medium leading-6">16cm to 20 cm</label>
                                        </div>
                                        
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-nothing" className="block text-lg font-medium leading-6">21cm to 25 cm
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-x-3">
                                            <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-nothing" className="block text-lg font-medium leading-6">26 cm to 30cm
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-x-3">
                                            <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-nothing" className="block text-lg font-medium leading-6">Above 30cm
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="email">
                                        Part of the body
                                    </label>
                                    <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Arm, Forearm" />
                                    <p className="text-[#7d3636] text-lg italic">Please fill out this field.</p>
                                </div>

                                <hr className="border-1 w-full" />


                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="email">
                                        Your best e-mail
                                    </label>
                                    <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="email@example" />
                                    <p className="text-[#7d3636] text-lg italic">Please fill out this field.</p>
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="email">
                                        Telephone number
                                    </label>
                                    <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="+39 389 748 2409" />
                                    <p className="text-[#7d3636] text-lg italic">Please fill out this field.</p>
                                </div>

                                <div className="w-full ">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="firstname">
                                        First Name
                                    </label>
                                    <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                                    <p className="text-[#7d3636] text-lg italic">Please fill out this field.</p>
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="lastname">
                                        Last name
                                    </label>
                                    <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Pack" />
                                    <p className="text-[#7d3636] text-lg italic">Please fill out this field.</p>
                                </div>

                                <div className='w-full'>
                                    
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="lastname">
                                        What are your pronouns?
                                    </label>

                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-everything" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-everything" className="block text-lg font-medium leading-6">Neuter</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-email" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-email" className="block text-lg font-medium leading-6">Feminine</label>
                                        </div>
                                        
                                        <div className="flex items-center gap-x-3">
                                            <input id="push-nothing" name="push-notifications" type="radio" className="h-4 w-4 border-gray-300 text-[#d3c1b2]" />
                                            <label for="push-nothing" className="block text-lg font-medium leading-6">Masculine</label>
                                        </div>

                                        <div className="flex items-center gap-x-3">
                                            <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Other" />
                                        </div>

                                    </div>
                                </div>

                                <div className='w-full'>
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="lastname">
                                        Your city
                                    </label>

                                    <input className="appearance-none text-gray-900 block w-full border border-[#7d3636] py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="City" />
                                    <p className="text-[#7d3636] text-lg italic">Please fill out this field.</p>
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase tracking-wide text-lg font-bold mb-2" for="email">
                                        What is your availability for the entire week, from Monday to Sunday?                                    </label>
                                    <div class="mt-2">
                                        <textarea id="about" name="about" rows="3" class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-10">
                                <button 
                                    type="submit" 
                                    className="w-full uppercase rounded-md bg-[#81de7c] px-3 py-2 text-xl font-semibold text-black shadow-sm hover:bg-[#d3c1b2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    Request a quote
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </section>
  );
}