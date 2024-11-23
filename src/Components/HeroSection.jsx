import React from 'react';
import { Button} from 'antd';
import aboutus_img from '../../src/assets/aboutus-img.jpg';

const HeroSection= () => {
  return (
    <section className='container'>
       <div className=" flex items-center justify-between  ">
         <div className="w-1/2 ">
           <div className="flex flex-col space-y-10 pl-10">
             <h1 className=''>welcome to store</h1>
             <p className=''>Our furniture is intelligently designed to give both comfort and functionality, while we also go to great lengths to ensure that we source only the highest quality raw materials and use the latest technologies to manufacture each individual piece.read more</p>
             <div className="">
               <Button type="primary">Read More</Button>
             </div>
           </div>
         </div>
         <div className="w-1/2  flex justify-center">
           <img src={aboutus_img} alt="" width={384}  />
         </div>
       </div>
    </section>
  );
};

export default HeroSection;