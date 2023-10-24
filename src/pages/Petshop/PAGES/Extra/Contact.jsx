import React, { useEffect } from 'react'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'

import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import './Extrapages.css'

const Contact = () => {
    const [rating, setrating] = React.useState(0)

    useEffect(() => {
        window.scrollTo(0,0)
      }, [])
    return (
        <div className='extrapage'>
            <Navbar reloadnavbar={false}/>
            <SingleBanner
                bannerimage='https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_1280.jpg'
                heading="Contact Us"
            />
            <div className='pgleft pgcommon'>
                <img src='https://cdn.pixabay.com/photo/2019/12/22/17/13/french-bulldog-4713013_640.jpg' alt='noimg' />

                <div className='pg'>
                    <h1>Contact us</h1>
                    <p> </p>

                </div>
            </div>

            
            <Footer2 />
            Contact</div>
    )
}

export default Contact