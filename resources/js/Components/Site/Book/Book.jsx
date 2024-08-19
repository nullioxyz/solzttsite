import React from 'react';
import { ReactTyped } from "react-typed";
import Form from './Form';

export default function Book({ requestSectionText, criativeProcess, consideration, paymentMethod }) {


  return (
    <section id="book" className="flex flex-col justify-between max-w-[1240px] h-auto mx-auto p-5 mt-10 text-white">
      <div className="text-left">
        <div className="title uppercase">
          <ReactTyped className='text-5xl tracking-tight' startWhenVisible showCursor={false} strings={["<h2>Request a Tattoo Quote</h2>"]} typeSpeed={40} />
        </div>
      </div>

      <div className="flex">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
          <div className="information m-5 lg:mt-20 md:mt-10 sm:mt-5">

            
            {requestSectionText && (
              <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                <div className='text-justify' dangerouslySetInnerHTML={{ __html: requestSectionText.default_translation.description }} />
              </div>
            )}

            {criativeProcess && (
              <>
                <div className="title uppercase mt-20">
                  <h2 className='text-[37px] tracking-tighter'>{criativeProcess.default_translation.title}</h2>
                </div>

                <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                  <div className='text-justify' dangerouslySetInnerHTML={{ __html: criativeProcess.default_translation.description }} />
                </div>
              </>
            )}

            {consideration && (
              <>
                <div className="title uppercase mt-20">
                  <h2 className='text-[37px] tracking-tighter'>{consideration.default_translation.title}</h2>
                </div>

                <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                  <div className='text-justify' dangerouslySetInnerHTML={{ __html: consideration.default_translation.description }} />
                </div>
              </>
            )}

            {paymentMethod && (
              <>
                <div className="title uppercase mt-20">
                  <h2 className="text-[37px] tracking-tighter">
                    {paymentMethod.default_translation.title}
                  </h2>
                </div>

                <div className="text mt-10 text-[20px] sm:mb-15 md:mb-15">
                  <div className="text-justify" dangerouslySetInnerHTML={{ __html: paymentMethod.default_translation.description }} />
                </div>
              </>
            )}
          </div>

          <Form />
        </div>
      </div>
    </section>
  );
}