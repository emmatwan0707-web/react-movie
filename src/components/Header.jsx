import React from 'react';
import logo from '../assets/logo.png';
import search from '../assets/search.png';

const Header = () => {
    return (
        <nav className="w-full bg-black text-white border-b border-gray-800 sticky top-0 z-50">

            <div className="grid grid-cols-3 items-center px-8 py-4">


                <div className="flex justify-start">
                    <img src={logo} alt="Logo" className="h-8 w-auto cursor-pointer" />
                </div>


                <ul className="flex justify-center gap-10 font-bold text-sm tracking-widest">
                    <li className="hover:text-blue-400 cursor-pointer text-gray-200 whitespace-nowrap">
                        <a href="#now-playing">See a Movie</a>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer text-gray-200 whitespace-nowrap">
                        <a href="#find-a-theatre">Find a Theatre</a>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer text-gray-200 whitespace-nowrap">Food & Drinks</li>

                </ul>


                <div className="flex justify-end">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-900 text-gray-200 tracking-wide text-sm pl-4 pr-10 py-1.5 rounded-md w-64 focus:outline-none border border-transparent focus:border-gray-700"
                        />
                        <div className="absolute right-3">
                            <img src={search} alt="search" className="h-4 w-4 opacity-70" />
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Header;