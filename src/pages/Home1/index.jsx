import React from 'react';
import Navbar from "../../components/molecules/Navbar";
import Banner from '../../components/molecules/Banner';
import MainCard from '../../components/molecules/MainCard';
import Footer1 from '../../components/molecules/Footer1';

import Card from '../../components/molecules/Card';
import TextImg from '../../components/molecules/TextImg';    
import Alert from '../../components/molecules/RedisterAlert';
import './Home1.css'



const Home1 = () => {
    return (
        <center>
            <div class="body">
           <body>
            <Banner/>
            <Navbar/>
            <Alert/>
            <Card/>
            <TextImg/>
            <MainCard/>
            <Footer1/>
            
            </body>
        </div>
   </center> );
}

export default Home1;






