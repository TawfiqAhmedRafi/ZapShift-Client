import React from 'react';
import Banner from '../Banner/Banner';
import HowItWork from '../HowItWork/HowItWork';
import Services from '../Services/Services';
import Brands from '../Brands/Brands';
import AnotherCard from '../AnotherCard/AnotherCard';
import Review from '../Review/Review';
import MerchantSection from '../MerchantSection/MerchantSection';
import FAQSection from '../FAQSection/FAQSection';


const reviewPromise = fetch('/reviews.json')
.then((res)=>res.json())
const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <HowItWork></HowItWork>
            <Services></Services>
            <Brands></Brands>
            <AnotherCard></AnotherCard>
            <MerchantSection></MerchantSection>
            <Review reviewPromise={reviewPromise}></Review>
            <FAQSection></FAQSection>
            
        </div>
    );
};

export default Home;