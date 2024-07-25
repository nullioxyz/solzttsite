import image1 from '@/Assets/Images/image1.png'
import image2 from '@/Assets/Images/image2.png'

export default function About() {
    return (
        <section id="about" className="flex justify-between items-center max-w-[1240px] h-auto mt-44 mx-auto text-white">
            <div className="flex flex-row justify-between p-5">
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                    <div>
                        <div className="title uppercase">
                            <h2 className='text-[37px] tracking-tighter'>Un divernire-arte in movimento:</h2>
                            <h1 className='text-5xl tracking-tight'> L'Universo di Sol Ztt</h1>
                        </div>

                        <div className="text mt-10 text-[20px] sm:mb-28 md:mb-36">
                            <p className='text-justify'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque nulla quis, repellendus quo earum quas natus, dolores molestiae accusantium aperiam aspernatur ratione? Repellat, ut. Minima vero ullam deserunt? Unde, sit?
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis esse accusantium laboriosam nostrum, veniam ratione minima nisi qui similique cumque! Nemo, amet minima consectetur harum cum doloremque voluptas mollitia alias.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugiat eligendi, aspernatur deleniti adipisci similique dignissimos dolore eum, reiciendis cumque corporis minima numquam vitae veniam? Illo quod ab voluptatibus iste?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ab quisquam eveniet numquam tempore quos id sapiente nemo blanditiis quasi illo tempora vel unde doloribus inventore qui magni! Fugit, unde?
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center lg:mt-32 sm:mt-32 md:mt-[-35px] mb-24 ml-9">
                        <img src={image1} alt="Image 1" />
                    </div>

                    <div className="flex justify-center max:lg:mt-[-260px] lg:mt-[-140px] sm:mt-[5px] ml-22">
                        <img src={image2} alt="Image 1" />
                    </div>

                    <div>
                        <div className="text mt-[-54px] ml-15 text-[20px] lg:mt-[-54px] md:mt-[20px] sm:mt-[20px] ">
                            <p className='text-justify'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque nulla quis, repellendus quo earum quas natus, dolores molestiae accusantium aperiam aspernatur ratione? Repellat, ut. Minima vero ullam deserunt? Unde, sit?
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis esse accusantium laboriosam nostrum, veniam ratione minima nisi qui similique cumque! Nemo, amet minima consectetur harum cum doloremque voluptas mollitia alias.
                            </p>
                            <br />
                            <p className='text-justify'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque nulla quis, repellendus quo earum quas natus, dolores molestiae accusantium aperiam aspernatur ratione? Repellat, ut. Minima vero ullam deserunt? Unde, sit?
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis esse accusantium laboriosam nostrum, veniam ratione minima nisi qui similique cumque! Nemo, amet minima consectetur harum cum doloremque voluptas mollitia alias.
                            </p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}