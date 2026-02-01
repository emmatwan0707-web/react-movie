import React from 'react';
import Github from '../assets/github.png';
import Linkedin from '../assets/linkedin.png';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white py-12 px-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                {/* 左侧：版权信息 */}
                <div className="flex-1 order-3 md:order-1 text-sm text-gray-400">
                    <p>© 2026 Emma Movie Theatres</p>
                </div>

                {/* 中间：Logo 区域 */}
                <div className="flex-1 order-1 md:order-2 flex flex-col items-center">
                    <img src={logo} className='w-12 h-12'/>
                    <div className="text-3xl font-bold tracking-tighter text-[#C8102E] flex flex-col items-center">
                        <span className="text-4xl text-[#C8102E]">Emma Movie Theatres</span>
                         </div>
                    <p className="text-[10px] tracking-[0.2em] mt-2 text-gray-300 font-light">
                        WE MAKE MOVIES BETTER™
                    </p>
                </div>

                {/* 右侧：社交媒体图标 */}
                <div className="flex-1 order-2 md:order-3 flex justify-center md:justify-end gap-6">
                    <a
                        href="https://github.com/emmatwan0707-web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        <img src={Github} className='w-12 h-12' />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/emma-huanchen-duan-0baa06254/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                    >
                        <img src={Linkedin} className='w-12 h-12'/>
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;