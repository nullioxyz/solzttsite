import image3 from '@/Assets/Images/image3.jpg'
import image4 from '@/Assets/Images/image4.jpg'
import image5 from '@/Assets/Images/image5.jpg'
import image6 from '@/Assets/Images/image6.jpg'
import image7 from '@/Assets/Images/image7.jpg'
import image8 from '@/Assets/Images/image8.jpg'
import image9 from '@/Assets/Images/image9.jpg'
import image10 from '@/Assets/Images/image10.jpeg'

export default function Works() {
    return (
        <section id="works" className="flex flex-col justify-between max-w-[1240px] h-auto mt-44 mx-auto p-5 text-white">
            <div className="text-left">
                <div className="title uppercase">
                    <h1 className='text-5xl tracking-tight'>Works</h1>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-center mt-10 mb-24">
                <div className="relative w-full h-[400px]">
                    <img src={image3} alt="Image 3" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image4} alt="Image 4" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image5} alt="Image 5" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image6} alt="Image 6" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image7} alt="Image 7" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image8} alt="Image 8" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image9} alt="Image 9" className="inset-0 object-cover w-full h-full" />
                </div>
                <div className="relative w-full h-[400px]">
                    <img src={image10} alt="Image 10" className="inset-0 object-cover w-full h-full" />
                </div>
            </div>


            <div className="flex justify-center mb-10">
                <button className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase">
                    Load more
                </button>
            </div>
        </section>
    )
}