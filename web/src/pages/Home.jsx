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
  } from '../components';

import {Community, Download, PackageCard, ServerInfo, CreateNews} from './index.js';
import BgPage from '../assets/bg_page.jpg';
import logo from '../assets/logo.png'

import NewsForm from "../components/NewsForm.jsx";


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
        <div className="relative flex flex-col min-h-screen bg-white overflow-hidden scroll-smooth">
            <Sidebar />
            <div
                id="banner"
                className="flex relative justify-center items-center w-screen min-h-[1080px] mx-auto text-white font-bold text-5xl"
            >
                {/* <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src={mainBgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <img src={logo} className="absolute w-[700px] h-full z-50 object-contain object-center animate-scaleLoop" />
                <img src={BgPage} className="absolute top-0 left-0 w-full h-full object-cover object-top" />
            </div>
            <ContentGrid />
            <Community />
            <Download />
            <ServerInfo />
            <PackageCard />
            <CreateNews />
            <NewsForm />
            <Footer />
        </div>
    );
};

export default Home;
