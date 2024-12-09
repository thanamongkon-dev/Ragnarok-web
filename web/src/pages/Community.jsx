import React from "react";
import bg from '../assets/iris-ro/bg2.jpg';

const Community = () => {
  return (
    <section 
        id="community"
        className="w-full min-h-screen bg-fit bg-center"
        style={{ 
            backgroundImage: `url(${bg})`,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the last value for opacity
            backgroundBlendMode: 'overlay' // Optional: to blend background with text
          }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
        Server Community
      </h1>
      <div className="flex flex-wrap items-center justify-around my-12 md:my-24">
        <div className="w-full md:w-1/2 py-4 px-14">
          <iframe
            src="https://e.widgetbot.io/channels/1251901477149212784/1251901477589483530?api=4cd13a30-ebc6-4b8f-af38-8f2d101895fc"
            width="100%"
            height="400"
            allowtransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="w-full h-96 md:h-[800px]"
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="flex flex-wrap items-center justify-center my-12 md:my-24">
            <iframe
              src="https://www.youtube.com/embed/vDKRic2d2gk"
              width="100%"
              height="300"
              allowtransparency="true"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="w-[500px] h-72 md:h-[300px]"
            />
          </div>
          <div className="flex flex-wrap items-center justify-around gap-x-4 md:gap-x-24">
            <div className="w-1/2 md:w-auto p-2">
              <a href="#">
                <img
                  src="https://discordapp.com/api/guilds/806200348540141589/embed.png?style=banner3"
                  className="object-cover w-full h-32 md:h-[130px] md:w-[320px]"
                />
              </a>
            </div>
            <div className="w-1/2 md:w-auto p-2">
              <a href="#">
                <img
                  src="https://discordapp.com/api/guilds/1251901477149212784/embed.png?style=banner3"
                  className="object-cover md:h-[130px] md:w-[320px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
