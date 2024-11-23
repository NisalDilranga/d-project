import React from 'react';

const SubSection = () => {
  return (
    <section className=' pt-16'>
        <div className="flex  mx-16">
            <div className="w-1/3 p-4 flex flex-col justify-between items-center">
                <img src="https://splashythemes.com/opencart/OPC02/OPC020055/catalog/view/theme/stripchairlayout2/image/themeimage/service-1.svg" alt=""  width={60} height={60}/>
                <div className="text-center">
                    <h1 className='font-bold mb-1'>Free island wide delivery</h1>
                    <p>Free delivery on all order above Rs.100K and get extra benifits on every purchase.</p>
                </div>
            </div>
            <div className="w-1/3 p-4 flex flex-col justify-between items-center">
            <img src="https://splashythemes.com/opencart/OPC02/OPC020055/catalog/view/theme/stripchairlayout2/image/themeimage/service-1.svg" alt=""  width={60} height={60}/>
                <div className="text-center ">
                    <h1 className='text-center font-bold mb-1'>Special Gift for you</h1>
                    <p>Best weekly special gifts and vouchers for our prime members on this season.</p>
                </div></div>
            <div className="w-1/3 p-4 flex flex-col justify-between items-center">
            <img src="https://splashythemes.com/opencart/OPC02/OPC020055/catalog/view/theme/stripchairlayout2/image/themeimage/service-1.svg" alt=""  width={60} height={60}/>
                <div className="text-center">
                    <h1 className='font-bold mb-1'>Online support</h1>
                    <p>Our team supported and provide bestest services 24*7 on all working days.</p>
                </div></div>
        </div>
    </section>
  );
};

export default SubSection;