import React from 'react'
import Slider from 'react-slick'
import './BannerSlider.css'

const BannerSlider = () => {
    const data = [
        {
            id: 1,
            image: 'https://cdn.pixabay.com/photo/2022/09/07/21/53/cat-7439657_1280.png',
            title: 'Shop for Pets 🐾',
            description: "Discover Premium Pet Products! Explore our curated selection of top-quality items designed to enhance your pet's life.",
            button: 'htttps://www.google.com'
        },
        {
            id: 2,
            image: 'https://cdn.pixabay.com/photo/2018/09/02/17/00/book-3649213_1280.jpg',
            title: 'Pet Paradise: Unleash the Best for Your Furry Friends',
            description: "Elevate Your Pet's Lifestyle with Premium Products",
            button: 'htttps://www.google.com'
        },
        {
            id: 3,
            image: 'https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751_1280.jpg',
            title: 'Paws & Claws Emporium: Unleash the Pet Paradise!',
            description: 'Shop Now for Happy, Healthy Pets!',
            button: 'htttps://www.google.com'
        },
    ]


    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 5000, 
    };


    return (
        <div className='bannerslider'>
            <Slider className='bannerslider' {...settings}>
                {
                    data.map(item => {
                        return (
                            <div className='imagecont' key={item.id}>
                                <img src={item.image} alt='noimg' />
                                <div className='content'>
                                    <h1 style={{fontSize:'30px'}}>{item.title}</h1>
                                    <span style={{fontSize:'15px'}}>{item.description}</span>
                                   
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default BannerSlider