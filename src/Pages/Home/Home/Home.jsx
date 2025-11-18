import React from 'react';
import Banner from '../Banner/Banner';
import HowItWork from '../HowItWork/HowItWork';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import AnotherCard from '../AnotherCard/AnotherCard';
const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <HowItWork></HowItWork>
            <Services></Services>
            <Brands></Brands>
            <AnotherCard></AnotherCard>

        </div>
    );
};

export default Home;