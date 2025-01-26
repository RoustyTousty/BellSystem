'use client'
import React, { useState } from "react";

const buj = () => {

    const [activeItem, setActiveItem] = useState(1);

    return (
        <div className="p-5 h-screen overflow-auto text-primary bg-white pt-20">
          <h1 className="text-4xl font-bold mb-10 text-center">Palīdzība</h1>

          <div className="carousel w-full flex">
                {[1, 2, 3].map((item, index) => (
                <div
                    key={index}
                    className={`carousel-item w-full transition-transform duration-300 ${
                    activeItem === item ? "block" : "hidden"
                    }`}
                >
                    <img
                    src={`https://img.daisyui.com/images/stock/photo-1625726411847-${item}cbb60cc71e6.webp`}
                    className="w-full h-auto max-h-screen object-contain rounded"
                    alt={`Item ${item}`}
                    />

                </div>
                ))}
           </div>

            <div className="flex w-full justify-center gap-10 py-5">
                <button
                  onClick={() => setActiveItem(1)}
                  className="btn btn-md btn-primary text-white"
                >
                    Zvana iestatīšana
                </button>

                <button
                  onClick={() => setActiveItem(2)}
                  className="btn btn-md btn-primary text-white"
                >
                    Trafaretu izveidotājs
                </button>

                <button
                  onClick={() => setActiveItem(3)}
                  className="btn btn-md btn-primary text-white"
                >
                    Pārējais
                </button>
            </div>


        </div>
      );
    }

export default buj