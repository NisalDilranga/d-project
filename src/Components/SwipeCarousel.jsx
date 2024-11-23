import React from 'react';
import { Carousel } from 'antd';
import { FaArrowLeft ,FaArrowRight} from "react-icons/fa6";

const SwipeCarousel = () => {
  return (
    <Carousel
      autoplay
      prevArrow={<FaArrowLeft  className='text-red-500 text-[100px]' style={{ fontSize: '30px', color: 'red', padding: '10px', cursor: 'pointer' }} />}
      nextArrow={<FaArrowRight style={{ fontSize: '30px', color: 'white', padding: '10px', cursor: 'pointer' }} />}
    >
      <div>
        <img
          className="carousel-img"
          src="https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/banners/main-banner2-1903x645.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          className="carousel-img"
          src="https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/banners/main-banner1-1903x645.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          className="carousel-img"
          src="https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/banners/main-banner3-1903x645.jpg"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default SwipeCarousel;
