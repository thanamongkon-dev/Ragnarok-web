import React, { useState, useEffect } from 'react';
import logo from '../assets/iris-ro/logo.png';
import axios from 'axios';
import useServerStatus from '../hooks/useServerStatus';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState('TH'); // Default language is Thai

  const serverStatus = useServerStatus();

  const openRegisterForm = () => {
    window.open('/register', '_blank', 'width=600,height=800');
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    // Here you can also store the selected language in localStorage or any state management (like Redux) if you want to persist it across pages.
    // localStorage.setItem('language', lang);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-[50%] ${isOpen ? 'right-44' : 'right-4'} z-50 p-2  text-white rounded-md focus:outline-none transition-all duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className={`fixed inset-y-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 w-48 bg-black backdrop-blur bg-opacity-45 text-white flex flex-col items-center p-4 z-40`}>
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="h-18" />
        </div>
        <div className='flex flex-col mx-auto mb-8'>
          <div className='flex flex-row space-x-4 text-center'>
              <p className='font-bold'>PLAYERS : </p>
              <p className='font-bold text-green-500'>{serverStatus.players}</p>
          </div>
          <div className='flex flex-row space-x-4 text-center'>
              <p className='font-bold'>STATUS : </p>
              <p className={`font-bold ${serverStatus.map === 'ONLINE' ? 'text-green-500' : 'text-red-500'}`}>{serverStatus.map}</p>
          </div>
        </div>
        
        {/* LANGUAGE SWITCHER */}
        <div className='flex flex-row text-black font-bold bg-white rounded-lg overflow-hidden'>
          <p
            onClick={() => toggleLanguage('TH')}
            className={`px-2 py-1 cursor-pointer ${language === 'TH' ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
          >
            TH
          </p>
          <p
            onClick={() => toggleLanguage('EN')}
            className={`px-2 py-1 cursor-pointer ${language === 'EN' ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
          >
            EN
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-4">
          <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2">
            <i className="fas fa-home mr-2"></i> {language === 'TH' ? 'หน้าหลัก' : 'HOME'}
          </a>
          <a href="#news" className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2">
            <i className="fas fa-home mr-2"></i> {language === 'TH' ? 'ข่าว' : 'NEWS'}
          </a>
          <a onClick={openRegisterForm} className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2 cursor-pointer">
            <i className="fas fa-user-plus mr-2"></i> {language === 'TH' ? 'สมัครสมาชิก' : 'REGISTER'}
          </a>
          <a href="#community" className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2">
            <i className="fas fa-comments mr-2"></i> {language === 'TH' ? 'ชุมชน' : 'COMMUNITY'}
          </a>
          <a href="#download" className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2">
            <i className="fas fa-download mr-2"></i> {language === 'TH' ? 'ดาวน์โหลด' : 'DOWNLOAD'}
          </a>
          <a href="#server" className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2">
            <i className="fas fa-user mr-2"></i> {language === 'TH' ? 'ข้อมูลเซิร์ฟเวอร์' : 'SERVER INFO'}
          </a>
          <a href="/donate" className="hover:text-gray-300 text-lg font-bold flex items-center w-full p-2">
            <i className="fas fa-donate mr-2"></i> {language === 'TH' ? 'เติมเงิน' : 'DONATE'}
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
