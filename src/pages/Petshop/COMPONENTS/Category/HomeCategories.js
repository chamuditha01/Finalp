import React from 'react'
import './HomeCategories.css'
import img1 from '../../ASSETS/Images/1.png'
import img5 from './black-cats-5958934_1920.png'
import img6 from './dog-6976691_1920.png'
import img7 from '../../ASSETS/Images/bird-silhouette-10.png'
import { useNavigate } from 'react-router-dom';




const HomeCategories = ({cusId }) => {

  const navigate = useNavigate(); 

  const handlecat = () => {
    
    navigate('/Homecat', { state: { cusId } });
  };
  const handledog = () => {
    
    navigate('/Homedog', { state: { cusId } });
  };
  const handleother = () => {
    
    navigate('/Homeother', { state: { cusId } });
  };

  return (
    <div className='homecategories'>
      <div className='container'>
        <img src={img5} alt='img1' />
        <div className='content'>
          <h1>
            Cat Items
          </h1>
          <a onClick={handlecat}><button>Shop Now</button></a>
        </div>
      </div>
      <div className='container'>
        <img src={img6} alt='img2' />
        <div className='content'>
          <h1>
            Dog Items
          </h1>
          <a onClick={handledog}><button>Shop Now</button></a>
        </div>
      </div>
      <div className='container'>
        <img src={img7} alt='img3' />
        <div className='content'>
          <h1>
            Other Items
          </h1>
          <a onClick={handleother}><button>Shop Now</button></a>
        </div>
      </div>
      
      
    </div>
  )
}

export default HomeCategories