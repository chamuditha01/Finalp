import React, { useEffect } from 'react'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './Extrapages.css'

const About = () => {

    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
  return (
    <div className='extrapage'>
        <Navbar reloadnavbar={false}/>
        <SingleBanner
        heading="About Us"
        bannerimage= 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg'
        />
        <div className='pgleft pgcommon'>
            <img src='https://cdn.pixabay.com/photo/2019/12/22/17/13/french-bulldog-4713013_640.jpg' alt='noimg' />

            <div className='pg'>
                <h1>About Us</h1>
                <p1>MyPets.lk is your One-stop shop for all things Pet related, selling a range of Top quality, correctly formulated Industry-trusted Pet supplies brands. We only work with official product agents in Sri Lanka and offer online payment and Islandwide delivery</p1>

            </div>
        </div>
       
        <Footer2/>
        </div>
  )
}

export default About