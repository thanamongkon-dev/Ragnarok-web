import React from 'react';
import logo from '../assets/iris-ro/logo.png';

const Navbar = () => {
  return (
    <nav className="w-screen h-[6rem] backdrop-blur text-white p-4 flex justify-center fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 mx-auto">
          {/* <img src="logo.png" alt="Logo" className="h-10" /> */}
          <div className="flex space-x-6">
            <img src={logo} alt="Logo" className="h-16" />
            <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-home mr-2"></i> HOME
            </a>
            <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-user-plus mr-2"></i> REGISTER
            </a>
            <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-comments mr-2"></i> COMMUNITY
            </a>
            <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-download mr-2"></i> DOWNLOAD
            </a>
            {/* <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-users mr-2"></i> Guild Regis
            </a> */}
            {/* <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-database mr-2"></i> Database
            </a> */}
            {/* <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-map mr-2"></i> World Map
            </a> */}
            <a href="#" className="hover:text-gray-300 text-lg font-bold flex items-center">
              <i className="fas fa-user mr-2"></i> SERVER INFO
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
