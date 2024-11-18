import React from "react";


const News = ({ content }) => {
    return (
        <>
            <h1 className="text-5xl font-bold m-8 text-center">News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur text-white rounded shadow p-4 transition-all duration-300 hover:scale-105"
                >
                    <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t"
                    />
                    <div className="p-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-400">{item.description}</p>
                    <p className="text-gray-500">{item.time}</p>
                    <button className="mt-4 py-2 px-4 bg-green-500 rounded">
                        อ่านเพิ่มเติม
                    </button>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
};

export default News;
