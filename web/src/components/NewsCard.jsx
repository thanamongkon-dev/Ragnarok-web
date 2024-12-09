import React from "react";

const NewsCard = ( { item} ) => {
  const DEFAULT_IMAGE_URL = "uploads/ex_news.png";
  return (
    <div className="bg-gray-100 backdrop-blur rounded shadow p-4 transition-all duration-300 hover:scale-105">
      <img
        src={`https://console-log.online/api/${item.image ? item.image : DEFAULT_IMAGE_URL}`}
        className="w-full h-48 object-cover object-center rounded-t"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="text-gray-400">{item.desc}</p>
        <p className="text-gray-500">{item.time}</p>
        <button className="mt-4 py-2 px-4 bg-green-500 rounded text-white">
          อ่านเพิ่มเติม
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
