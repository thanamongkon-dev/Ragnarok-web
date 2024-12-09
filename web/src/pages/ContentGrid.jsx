import React, { useState, useEffect } from 'react';
import Paginate from '../components/Paginate';
import news from '../assets/iris-ro/bg1.jpg';
import News from '../components/News';

import Credit from '../assets/event/Credit.jpg';
import Item from '../assets/event/Item-Collect.jpg';
import LevelUP from '../assets/event/LevelUP.jpg';
import Member from '../assets/event/Member.jpg';
import Online from '../assets/event/Online.jpg';
import Premium from '../assets/event/Premium.jpg';

import { fetchNews } from '../hooks/fetchNews';


const ContentGrid = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNews();
        setContent(newsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  },[])


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = content.slice(firstPostIndex, lastPostIndex);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  

  return (
    <section
      id="news" 
      // className="flex flex-col items-center justify-center min-h-screen bg-fit bg-center text-white"
      className="flex flex-col items-center justify-center min-h-screen bg-fit bg-center bg-gradient-to-t from-black to-transparent"
      style={{ 
        // backgroundImage: `url(${news})`,
        // objectFit: 'cover',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the last value for opacity
        // backgroundBlendMode: 'overlay' // Optional: to blend background with text
      }}
    >
      <News content={currentPosts} />
      
      <div className="flex justify-center my-12">
        <Paginate
          totalPosts={content.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default ContentGrid;
