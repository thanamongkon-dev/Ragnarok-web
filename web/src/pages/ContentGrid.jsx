import React, { useState } from 'react';
import Paginate from '../components/Paginate';
import news from '../assets/iris-ro/bg1.jpg';
import News from '../components/News';

import Credit from '../assets/event/Credit.jpg';
import Item from '../assets/event/Item-Collect.jpg';
import LevelUP from '../assets/event/LevelUP.jpg';
import Member from '../assets/event/Member.jpg';
import Online from '../assets/event/Online.jpg';
import Premium from '../assets/event/Premium.jpg';


const ContentGrid = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

  const [content, setContent] = useState(
    [
      {
        title: 'Maintenance ครั้งที่ 4',
        description: 'รายละเอียดปิดปรับปรุง ครั้งที่ 4',
        time: '20 hours ago',
        image: Credit,
      },
      {
        title: 'Weekend Of Investor ครั้งที่ 5',
        description: 'Weekend Of Investor ครั้งที่ 5',
        time: '5 days ago',
        image: Item,
      },
      {
        title: 'Maintenance ครั้งที่ 4',
        description: 'รายละเอียดปิดปรับปรุง ครั้งที่ 4',
        time: '20 hours ago',
        image: LevelUP,
      },
      {
        title: 'Weekend Of Investor ครั้งที่ 5',
        description: 'Weekend Of Investor ครั้งที่ 5',
        time: '20 hours ago',
        image: Member,
      },
      {
        title: 'Maintenance ครั้งที่ 4',
        description: 'รายละเอียดปิดปรับปรุง ครั้งที่ 4',
        time: '20 hours ago',
        image: Online,
      },
      {
        title: 'Weekend Of Investor ครั้งที่ 5',
        description: 'Weekend Of Investor ครั้งที่ 5',
        time: '5 days ago',
        image: Premium,
      },
      // Add more content objects here
    ]
  )

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = content.slice(firstPostIndex, lastPostIndex);
  

  return (
    <section
      id="news" 
      className="flex flex-col items-center justify-center min-h-screen bg-fit bg-center text-white"
      style={{ 
        backgroundImage: `url(${news})`,
        // objectFit: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the last value for opacity
        backgroundBlendMode: 'overlay' // Optional: to blend background with text
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
