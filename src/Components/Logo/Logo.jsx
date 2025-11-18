import React from 'react';
import LogoImg  from "../../assets/logo.png"
const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={LogoImg} alt="" />
            <h3 className='text-3xl font-bold -ms-2.5'> ZapShift</h3>
        </div>
    );
};

export default Logo;