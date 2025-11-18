import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RooyLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className='max-w-6xl mx-auto'>
                <Outlet></Outlet> 
            </div>
           
            <Footer></Footer>
        </div>
    );
};

export default RooyLayout;