import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Slider from "react-slick";

const items = [
  { id: 1, title: "$50 OFF PREMIUM BRAKE SERVICE", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 2, title: "FREE CHECK ENGINE DIAGNOSTIC SCAN CAR", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 3, title: "INTERNAL TRANSMISSION REPAIR: $100 OFF", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 4, title: "ANNUAL TECHNICAL INSPECTION OF CARS", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 5, title: "$50 OFF PREMIUM BRAKE SERVICE", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 6, title: "Project Title 1", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 7, title: "Project Title 1", imageUrl: "/imgs/nature/chair.jpg" },
  { id: 8, title: "Project Title 1", imageUrl: "/imgs/nature/chair.jpg" },
];

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 top-5 bg-gray-600 p-2 rounded-full shadow-md z-10 hover:bg-white transform -translate-y-1/2"
    onClick={onClick}
  >
    ➡️
  </button>
);

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 top-5 bg-gray-600 p-2 rounded-full shadow-md z-10 hover:bg-white transform -translate-y-1/2"
    onClick={onClick}
  >
    ⬅️
  </button>
);

const FeaturedProducts = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="  bg-white pt-[90px]  px-16 ">
      <div className="text-4xl text-center font-semibold pb-10">
        <h1>Top Categories</h1>
      </div>
      <Slider {...settings} className="overflow-hidden">
        {items.map((item, index) => (
          <div key={index} className="px-4">
            <div className="relative group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-64 object-contain transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaCartArrowDown className="text-black text-3xl mx-2 cursor-pointer" />
                <FaHeart className="text-black text-3xl mx-2 cursor-pointer" />
              </div>
            </div>
            <h3 className="text-center text-lg font-medium pt-4">{item.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedProducts;
