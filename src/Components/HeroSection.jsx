import React from 'react';
import { Button} from 'antd';
import aboutus_img from '../../src/assets/aboutus-img.jpg';

const HeroSection= () => {
  return (
    <section className='bg-[#666666] py-24 bg-opacity-20'>
       <div className=" flex items-center justify-between  mx-10  ">
         <div className="w-1/2 ">
           <div className="flex flex-col space-y-10 pl-10 mr-16">
             <h1 className='text-[48px] font-bold'>welcome to store</h1>
             <p className='break-words text-[18px] font-[500] pt-7'>Our furniture is intelligently designed to give both comfort and functionality, while we also go to great lengths to ensure that we source only the highest quality raw materials and use the latest technologies to manufacture each individual piece.read more</p>
             <div className="pt-10">
               <Button type="primary" className='px-10 py-5 rounded-3xl'  >Read More</Button>
             </div>
           </div>
         </div>
         <div className="w-1/2  flex justify-center ">
           <img src={aboutus_img} alt="" width={900}  />
         </div>
       </div>
    </section>
  );
};

export default HeroSection;