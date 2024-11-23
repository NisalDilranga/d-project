import React from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const items = [
    { id: 1, title: '$50 OFF PREMIUM BRAKE SERVICE', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 2, title: 'FREE CHECK ENGINE DIAGNOSTIC SCAN CAR', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 3, title: 'INTERNAL TRANSMISSION REPAIR: $100 OFF', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 4, title: 'ANNUAL TECHNICAL INSPECTION OF CARS', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 5, title: '$50 OFF PREMIUM BRAKE SERVICE', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 6, title: 'Project Title 1', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 7, title: 'Project Title 1', imageUrl: '/imgs/nature/chair.jpg' },
    { id: 8, title: 'Project Title 1', imageUrl: '/imgs/nature/chair.jpg' },
];
// Custom Next Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className="absolute right-2 top-0 bg-gray-600 p-2 rounded-full shadow-md z-10 hover:bg-white"
      onClick={onClick}
    >
      ➡️
    </button>
  );
  
  // Custom Previous Arrow
  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className="absolute left-[-2px] top-[-10px] bg-gray-600 p-2 rounded-full shadow-md z-10 hover:bg-white"
      onClick={onClick}
    >
      ⬅️
    </button>
  );

const Slikslider = () => {

    var settings = {
        dots:false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      };
  return (
    <div className='container relative h-screen bg-white pt-[10px] flex flex-col  '>

      

 <div className="relative  w-3/4 m-auto ">
 <div className="text-[40px] text-center font-[600] pb-10">
         <h1>Top Categories</h1>
       </div>
 <Slider {...settings}  className="overflow-hidden bg-cover bg-no-repeat item-body relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full  before:origin-center before:transition-transform before:duration-200 before:ease-in hover:before:scale-x-100">
    
    {
        items.map((item,index)=>{
            return(
                <div className="" key={index}>
                    
                    <div className="relative overflow-hidden bg-cover bg-no-repeat group ">
                        <img src={item.imageUrl} alt="" className='w-[260px] h-[320px] object-contain transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-70 ' />
                        <div className="absolute inset-0 flex    bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:content-[''] before:absolute before:top-0 before:left-0  before:border-t-[5px]  before:scale-x-0 before:origin-top-left before:transition-transform before:duration-200 before:ease-in group-hover:before:scale-x-100 ">
                            {/* <span className="text-black text-[18px]  text-center ">
                             <FaCartArrowDown  className='text-center'/>
                            </span> */}
                            <div className="  relative ">
                              <div className="cursor-pointer">
                                <FaCartArrowDown  className='absolute text-center text-black text-[30px] left-[80px] top-[130px]'/>
                              </div>
                              <div className="cursor-pointer">
                                <FaHeart  className='absolute text-center text-black text-[30px] left-[150px] top-[130px]'/>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-cover bg-no-repeat group py-7">
                        <img src={item.imageUrl} alt="" className='w-[260px] h-[320px] object-contain transition duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-70 ' />
                        <div className="absolute inset-0 flex    bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:content-[''] before:absolute before:top-0 before:left-0  before:border-t-[5px]  before:scale-x-0 before:origin-top-left before:transition-transform before:duration-200 before:ease-in group-hover:before:scale-x-100 ">
                            {/* <span className="text-black text-[18px]  text-center ">
                             <FaCartArrowDown  className='text-center'/>
                            </span> */}
                            <div className="  relative ">
                              <div className="cursor-pointer">
                                <FaCartArrowDown  className='absolute text-center text-black text-[30px] left-[80px] top-[130px]'/>
                              </div>
                              <div className="cursor-pointer">
                                <FaHeart  className='absolute text-center text-black text-[30px] left-[150px] top-[130px]'/>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    </Slider>
 </div>
    </div>
  );
};

export default Slikslider;