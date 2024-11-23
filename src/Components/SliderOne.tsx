import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
    { id: 1, title: 'A World of Frames and Memories', imageUrl: 'https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/manufacturer/3-165x60.png' },
    { id: 2, title: 'Timeless Craftsmanship and Elegance', imageUrl: 'https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/manufacturer/6-165x60.png' },
    { id: 3, title: 'Redefining Comfort and Style', imageUrl: 'https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/manufacturer/7-165x60.png' },
    { id: 4, title: 'Your Haven of Inspiration and Comfort', imageUrl: 'https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/manufacturer/5-165x60.png' },
    { id: 5, title: 'Crafted for Your Comfort and Style', imageUrl: 'https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/manufacturer/4-165x60.png' },
    { id: 6, title: 'Where Design Meets Functionality', imageUrl: 'https://splashythemes.com/opencart/OPC02/OPC020055/image/cache/catalog/demo/manufacturer/1-165x60.png' },
    
];

const SliderOne = () => {
    const settings = {
        infinite: true,
        speed: 3000,          // Adjust speed for continuous effect
        slidesToShow: 4,      // Default number of slides
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2,     // No delay between scrolls
        cssEase: 'linear',    // Linear easing for race effect
        pauseOnHover: false,
        arrows: false,
        prevArrow: (
            <button className="slick-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-white bg-black opacity-50 hover:opacity-100 p-3 rounded-full focus:outline-none">
                ←
            </button>
        ),
        nextArrow: (
            <button className="slick-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-white bg-black opacity-50 hover:opacity-100 p-3 rounded-full focus:outline-none">
                →
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024, // For screens <= 1024px
                settings: {
                    slidesToShow: 3,  // Show 3 slides at this width
                }
            },
            {
                breakpoint: 768, // For screens <= 768px
                settings: {
                    slidesToShow: 2,  // Show 2 slides at this width
                }
            },
            {
                breakpoint: 480, // For screens <= 480px
                settings: {
                    slidesToShow: 1,  // Show 1 slide at this width
                }
            }
        ]
    };

    return (
        <section className="bg-accentDark2 text-white p-[120px] ">
            <div className="container relative">
                <Slider {...settings} className="mt-[35px] overflow-hidden bg-cover bg-no-repeat  item-body border-t-[2px] border-[#242424] relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full   before:scale-x-0 before:origin-center before:transition-transform before:duration-200 before:ease-in hover:before:scale-x-100 pt-[25px]">
                    {items.map((item) => (
                        <div key={item.id} className="px-4">
                            <div className="relative flex items-center gap-6 overflow-hidden bg-cover bg-no-repeat group">
                                <img
                                    src={item.imageUrl}
                                    alt="car-engine"
                                    width={693.86}
                                    height={441.29}
                                    className="transition duration-300 ease-in-out group-hover:scale-110 hover:opacity-55"
                                />
                                <div className="absolute inset-0 flex bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:border-t-[5px] before:border-[#d16527] before:scale-x-0 before:origin-top-left before:transition-transform before:duration-200 before:ease-in group-hover:before:scale-x-100">
                                    <span className="text-white text-[18px] font-[700] p-5 text-center hover:text-[#d16527]">{item.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default SliderOne;
