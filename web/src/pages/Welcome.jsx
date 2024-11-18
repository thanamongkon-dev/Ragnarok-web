import React from "react";
import mainBgVideo from "../assets/iris-ro/entersite2.mp4";
import enterBtn from "../assets/iris-ro/entersite-button.png";
import downloadBtn from "../assets/iris-ro/download-button.png";
import regBtn from "../assets/iris-ro/register-button.png";

const Welcome = () => {
  const openRegisterForm = () => {
    window.open('/register', '_blank', 'width=600,height=800');
    window.location.href = '/home';
  };
  return (
    <div className="flex flex-col self-center w-screen min-h-screen items-center justify-center overflow-hidden bg-slate-900 relative">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={mainBgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col items-center justify-center z-50 absolute bottom-12 w-screen">
        <div className="flex justify-center items-center w-fit absolute bottom-4 ">
          <a
            href="/home"
            className="transition-all duration-300 hover:scale-105 "
          >
            <img
              src={enterBtn}
              alt="Enter Site Button"
              className="transition-all duration-300 hover:scale-105"
            />
          </a>
        </div>
        <div className="flex justify-evenly items-center w-fit space-x-[350px]  p-4">
          <a onClick={openRegisterForm} className="hidden md:block">
            <img
              src={regBtn}
              alt="Register Button"
              className="transition-all duration-300 hover:scale-105 cursor-pointer"
            />
          </a>
          <a href="/home#download" className="hidden md:block">
            <img
              src={downloadBtn}
              alt="Download Button"
              className="transition-all duration-300 hover:scale-105"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
