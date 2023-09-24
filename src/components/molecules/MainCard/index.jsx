import React from 'react';
import './MainCard.css';
import MainCard1 from '../../atoms/MainCard1';
import { useInView } from 'react-intersection-observer';

const MainCard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, 
  });

  return (
    <div ref={ref} className={`main-card ${inView ? 'visible' : ''}`}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <MainCard1  path={'https://www.thesprucepets.com/types-of-dog-supplies-1118618'} title={'Dog Accesories'} content={'Studies suggest that dog owners have lower blood pressure levels and improved responses to stress. Research has concluded that the bond between humans and dogs reduces stress, which is a major cause of cardiovascular problems.'}/>
          <MainCard1 path={'https://www.wired.com/gallery/best-cat-toys-and-supplies/'} title={'Cat Accesories'} content={'Cat foods are typically in either a dry kibble form or a wet canned form. Foods consist of water, protein, fat, carbohydrates...etc. Most cat food labels list their nutritional value on an “as fed basis” that includes the moisture level.'}/>
          <MainCard1 path={'https://www.britannica.com/animal/bird-animal'} title={'Bird Accesories'} content={'The better mixtures contain plenty of flaked maize, sunflower seeds and peanut granules. Small seeds,like millet, attract mostly house sparrows, dunnocks, finches, and reed buntings while flaked maize is taken readily by blackbirds.'}/>

      </div>
    </div>
  );
};

export default MainCard;