import image3 from '@/Assets/Images/image3.jpg'
import image4 from '@/Assets/Images/image4.jpg'
import image5 from '@/Assets/Images/image5.jpg'
import image6 from '@/Assets/Images/image6.jpg'
import image7 from '@/Assets/Images/image7.jpg'
import image8 from '@/Assets/Images/image8.jpg'
import image9 from '@/Assets/Images/image9.jpg'
import image10 from '@/Assets/Images/image10.jpeg'

export default function AvailableDesign() {
    return (
        <section id="available" className="flex flex-col justify-between h-auto mx-auto p-5 text-white">
            <div className="max-w-[1240px] mx-auto">
                <div className="lg:text-left sm:text-center custom:text-center md:text-center">
                    <div className="title uppercase">
                        <h1 className='text-5xl tracking-tight'>Available Designs</h1>
                    </div>
                </div>
            
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-10 mb-24">
                    {[
                        image3, image4, image5, image6, 
                        image7, image8, image9, image10
                    ].map((image, index) => (
                        <div key={index} className="relative w-full h-[400px]">
                            <img src={image} alt={`Image ${index + 1}`} className="inset-0 object-cover w-full h-full" />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                                <button className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300 uppercase">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mb-10">
                    <button className="px-6 py-3 bg-[#272533] text-white text-lg rounded-full hover:bg-[#9a7cae] transition duration-300">
                        Load more
                    </button>
                </div>
            </div>
        </section>
    )
}