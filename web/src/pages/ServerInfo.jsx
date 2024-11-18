import React from 'react';
import bg from '../assets/iris-ro/bg2.jpg';

const rowsColor = 'odd:bg-white even:bg-gray-300 border-b dark:border-gray-700';

const ServerInfo = () => {
    return (
        <section id='server' 
            className='flex flex-col items-center bg-slate-900 bg-fit bg-center'
            style={{ 
                backgroundImage: `url(${bg})`,
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the last value for opacity
                backgroundBlendMode: 'overlay' // Optional: to blend background with text
              }}
        >
            <h1 className='text-3xl md:text-5xl font-bold m-8 text-white'>Server Info</h1>
            <div className='w-full md:w-2/3 overflow-x-auto'>
                <table className='w-full table-auto text-center text-gray-700 font-semibold rounded border opacity-80 my-8'>
                    {/* <thead>
                        <tr className='bg-gray-200 dark:bg-gray-800'>
                            <th className='px-4 py-2'>Attribute</th>
                            <th className='px-4 py-2'>Value</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Opening date</td>
                            <td className='px-4 py-2'>MM DD YYYY</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>System</td>
                            <td className='px-4 py-2'>Renewal</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Episode</td>
                            <td className='px-4 py-2'>1.0</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Max Level</td>
                            <td className='px-4 py-2'>99/50</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Exp Rate</td>
                            <td className='px-4 py-2'>x2</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Ect Drops Rate</td>
                            <td className='px-4 py-2'>x2</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Useable Drops Rate</td>
                            <td className='px-4 py-2'>x2</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Equipment Drops Rate</td>
                            <td className='px-4 py-2'>x2</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>Card Rate</td>
                            <td className='px-4 py-2'>x2</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>MVP Drops</td>
                            <td className='px-4 py-2'>x3</td>
                        </tr>
                        <tr className={rowsColor}>
                            <td className='px-4 py-2'>MVP Cards</td>
                            <td className='px-4 py-2'>0.01%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ServerInfo;
