import React from 'react'
import Credit from '../assets/event/Credit.jpg';
import Item from '../assets/event/Item-Collect.jpg';
import LevelUP from '../assets/event/LevelUP.jpg';
import Member from '../assets/event/Member.jpg';
import Online from '../assets/event/Online.jpg';
import Premium from '../assets/event/Premium.jpg';

import Lists from '../components/Lists';

const content = (
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

const CreateNews = () => {
  return (
    <div className='container mx-auto'>
      <h1 className='text-5xl font-bold m-8 text-center'>Create News</h1>
      <div className='flex justify-end'>
        <button className='w-48 h-12 text-center items-end place-content-center bg-green-500 text-white text-xl font-bold rounded mb-4 cursor-pointer'>สร้างหัวข้อใหม่</button>
      </div>
      <Lists list={content} />
    </div>
  )
}

export default CreateNews