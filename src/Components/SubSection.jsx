import React from 'react';

const SubSection = () => {
  return (
    <section className='container'>
        <div className="flex">
            <div className="w-1/3 p-4 flex flex-col justify-between items-center">
                <img src="https://splashythemes.com/opencart/OPC02/OPC020055/catalog/view/theme/stripchairlayout2/image/themeimage/service-1.svg" alt=""  width={60} height={60}/>
                <div className="text-center">
                    <h1>free worldwide shipping</h1>
                    <p>Free shipping on all order above $199 and get extra benifits on every purchase.</p>
                </div>
            </div>
            <div className="w-1/3 p-4 flex flex-col justify-between items-center">
            <img src="https://splashythemes.com/opencart/OPC02/OPC020055/catalog/view/theme/stripchairlayout2/image/themeimage/service-1.svg" alt=""  width={60} height={60}/>
                <div className="text-center">
                    <h1 className='text-center'>free worldwide shipping</h1>
                    <p>Free shipping on all order above $199 and get extra benifits on every purchase.</p>
                </div></div>
            <div className="w-1/3 p-4 flex flex-col justify-between items-center">
            <img src="https://splashythemes.com/opencart/OPC02/OPC020055/catalog/view/theme/stripchairlayout2/image/themeimage/service-1.svg" alt=""  width={60} height={60}/>
                <div className="text-center">
                    <h1>free worldwide shipping</h1>
                    <p>Free shipping on all order above $199 and get extra benifits on every purchase.</p>
                </div></div>
        </div>
    </section>
  );
};

export default SubSection;