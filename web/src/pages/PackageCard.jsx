import React from "react";
import Card from "../components/Card";

const PackageCard = () => {
    const cards = [
        {
            title: "START",
            price: 500,
            itemId: 501,
            features: [
                { itemId: 420065, item: "Archangel Balloon" },
                { itemId: 2573, item: "+8 Archangel Wings" },
                { itemId: 1000282, item: "EP16 Pass" },
                { itemId: 1000896, item: "6000 Cash" }
            ],
            buttonText: "ซื้อ",
        },
        {
            title: "PRO",
            price: 1000,
            itemId: 502,
            features: [
                { itemId: 15975, item: "Flying Drone" },
                { itemId: 15969, item: "Twin Cannon" },
                { itemId: 15376, item: "+9 Illusion Armor Box" },
                { itemId: 1000282, item: "EP16 Pass" },
                { itemId: 1000896, item: "12500 Cash" }
            ],
            buttonText: "ซื้อ",
        },
        {
            title: "SPECIAL",
            price: 2000,
            itemId: 503,
            features: [
                { itemId: 420342, item: "Wireless Drone" },
                { itemId: 480451, item: "+9 Automatic Engine Wing Type-C" },
                { itemId: 450127, item: "+9 Automatic Armor Box" },
                { itemId: 1000282, item: "EP16 Pass" },
                { itemId: 1000287, item: "EP17 Pass" },
                { itemId: 1000896, item: "25000 Cash" }
            ],
            buttonText: "ซื้อ",
        },
    ];

    return (
        <section className="flex flex-col items-center bg-white w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold m-8">Package</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        price={card.price}
                        itemId={card.itemId}
                        features={card.features}
                        buttonText={card.buttonText}
                    />
                ))}
            </div>
        </section>
    );
};

export default PackageCard;
