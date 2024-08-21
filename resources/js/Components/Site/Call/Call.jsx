import { ReactTyped } from "react-typed";

export default function (props) {
  return (
    <section id="works" className="flex flex-col justify-between max-w-[1240px] h-auto mx-auto text-white">
      <div className="flex justify-center m-20">
        <p className='text-4xl text-center'>
          <ReactTyped startWhenVisible showCursor={false} strings={[props.text]} typeSpeed={40} />
        </p>
      </div>

      {props.book ? (
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-[#FFF] text-black text-2xl rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase">
            Book a session
          </button>
        </div>
      ) : null}

    </section>
  )
}