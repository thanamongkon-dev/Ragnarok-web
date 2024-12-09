import React from "react";
import NewsCard from "./NewsCard";


const News = ({ content }) => {
    return (
        <div className="mx-auto">
            <h1 className="text-5xl font-bold m-8 text-center">News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((item, index) => (
                <NewsCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default News;
