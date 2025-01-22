import React from 'react'

const buj = () => {
    return (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-5">Palīdzība</h1>

          <div className="carousel w-full">

                <div id="item1" className="carousel-item w-full">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                    className="w-full rounded" />
                </div>

                <div id="item2" className="carousel-item w-full">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                    className="w-full rounded" />
                </div>

                <div id="item3" className="carousel-item w-full">
                    <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    className="w-full rounded" />
                </div>

            </div>

            <div className="flex w-full justify-center gap-10 py-5">
                <a href="#item1" className="btn btn-md text-white">Zvana iestatīšana</a>
                <a href="#item2" className="btn btn-md text-white">Trafaretu izveidotājs</a>
                <a href="#item3" className="btn btn-md text-white">Pārējais</a>
            </div>


        </div>
      );
    }

export default buj