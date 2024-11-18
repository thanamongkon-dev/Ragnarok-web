import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import mainBgVideo from '../assets/iris-ro/main-bg.mp4';
import ContentGrid from "./ContentGrid.jsx";
import {
    StatusCount,
    Footer,
    Sidebar,
    LoginComponent,
    Member,
    CreateNews
  } from '../components';

import {Community, Download, PackageCard, ServerInfo} from './index.js';


const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#download') {
        const downloadSection = document.getElementById('download');
        if (downloadSection) {
            downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
        }
    }, [location]);
    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden scroll-smooth">
            <Sidebar />
            <div
                id="banner"
                className="flex relative justify-center items-center w-screen min-h-[1080px] mx-auto text-white font-bold text-5xl"
            >
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src={mainBgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* Status View */}
                <div className="flex flex-rows justify-evenly items-center w-2/3 absolute bottom-12 z-20">
                    <StatusCount />
                    <StatusCount />
                    <StatusCount />
                    {/* <StatusCount /> */}
                </div>
            </div>
            <ContentGrid />
            <Community />
            <Download />
            <ServerInfo />
            <PackageCard />
            <CreateNews />
            <Footer />
        </div>
    );
};

export default Home;
