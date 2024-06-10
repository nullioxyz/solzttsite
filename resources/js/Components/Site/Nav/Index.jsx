import { useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";


export default function Index() {
    const [open, setOpen] = useState(false);

    const onclickMenu = () => {
        setOpen(!open);
    }

    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto text-white bg-[#000000]">
            <div className="iconMenu flex ml-auto mr-2 cursor-pointer" onClick={onclickMenu}>
                {!open ? <TiThMenu size={30} /> : <IoCloseSharp size={30} />}
            </div>

            <div className={`mobile-menu fixed top-10 bg-black text-black w-60 transition-transform duration-300 ease-in-out ${open ? 'transform translate-y-0' : 'transform -translate-y-full -mt-28'}`}>
                <ul className="uppercase flex flex-col space-y-* ml-2 text-[20px] roboto-medium">
                    <li className="border-b border-gray-300 py-2 px-4 mb-5">
                        <a href="#" className="text-white">About</a>
                    </li>
                    <li className="border-b border-gray-300 py-2 px-4 mb-5">
                        <a href="#" className="text-white">Portfolio</a>
                    </li>
                    <li className="border-b border-gray-300 py-2 px-4 mb-5">
                        <a href="#" className="text-white">Contact</a>
                    </li>
                </ul>
            </div>
        </div>

    );
}