import React from 'react'
import { useState } from "react";
import Slikslider from './Slikslider';
import { h1 } from 'framer-motion/client';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('Office Furniture');
    const renderContent = () => {
        switch (activeTab) {
          case 'Office Furniture':
            return <Slikslider />;
          case 'Outdoor Furniture':
            return <Slikslider />;
          case 'Bedroom Furniture':
            return <p>yyyyyyyy</p> ;
          default:
            return null;
        }
      };
  return (
    <div className="w-full bg-[#FFFFFF99] rounded-[30px] border-[0.7px] mt-[40px] p-5 pt-20 border-white font-inter">
        <div className="text-4xl text-center font-semibold pb-10">
        <h1>Top Categories</h1>
      </div>
    {/* Tabs Header */}
    <div className="flex rounded-t-[20px] overflow-hidden justify-center">
      {['Office Furniture', 'Outdoor Furniture', 'Bedroom Furniture'].map((tab, index) => (
        <button
          key={tab}
          className={`text-sm border-[1px] border-[#FFFFFF] w-[206px] h-[41px] text-center ${
            activeTab === tab
              ? 'text-[18px] font-[600] border bg-[#FFFFFF] text-[#222222]'
              : 'text-[#616161] hover:text-orange-500 bg-transparent text-[14px] font-[400]'
          } ${
            index === 0
              ? 'rounded-tl-[20px]' 
              : index === 2
              ? 'rounded-tr-[20px]' 
              : ''
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
    {/* Tabs Content */}
    <div className="p-4 bg-white rounded-b-md">{renderContent()}</div>
  </div>
  )
}

export default Tabs