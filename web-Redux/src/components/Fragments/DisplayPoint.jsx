import React from 'react';

const DisplayPoint = ({ title, value }) => {
  return (
    <div className='w-full flex items-center justify-center p-4 bg-white font-bold shadow rounded border'>
        <span className='text-xl mr-2'>
          {/* Optional Icon or any content here */}
        </span>
        <p className='text-center text-lg sm:text-xl font-bold cursor-default'>
            {title.toUpperCase()} Point: {value} แต้ม
        </p>
    </div>
  );
}

export default DisplayPoint;
