import React from 'react';
import logo from '../assets/iris-ro/logo.png';
// import bg from '../assets/iris-ro/bg-download.png';
import bg from '../assets/iris-ro/bg3.jpg';

const Download = () => {

    const handleDownload = () => {
        console.log('Download button clicked!');
        window.open('https://console-log.online/assets/download-button-Iexl0w51.png', '_blank');
    };
    return (
        <section 
            id="download"
            className='flex flex-col items-center justify-center h-screen bg-fit bg-center text-white' 
            style={{ 
                backgroundImage: `url(${bg})`,
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the last value for opacity
                backgroundBlendMode: 'overlay' // Optional: to blend background with text
            }}
        >
            <h1 className='text-5xl font-bold mb-8'>Download Client</h1>
            <div className='flex flex-col items-center bg-black bg-opacity-50 p-8 rounded-lg'>
                <img src={logo} className='h-32 w-32 object-cover mb-4' />
                <h3 className='text-3xl font-bold mb-2'>Download Full Client</h3>
                <p className='text-lg font-bold opacity-70 mb-4'>4 Gb</p>
                <a 
                    download="download.zip" 
                    target="_blank" 
                    href="http://localhost:5173/assets/iris-ro-20240616T183420Z-001.zip" 
                    className='w-40 h-12 text-center place-content-center bg-blue-600 text-white text-xl font-bold rounded mb-4 cursor-pointer'
                >
                    Download
                </a>
                <div className='flex flex-row gap-x-8'>
                    <a href="#" className='underline opacity-70 hover:opacity-100'>Mega</a>
                    <a href="#" className='underline opacity-70 hover:opacity-100'>Google Drive</a>
                </div>
            </div>
        </section>
    );
};

export default Download;
