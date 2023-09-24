import React from 'react';
import card11 from './pexels-kampus-production-8734426.jpg'
import card2 from './pexels-alexas-fotos-2173872.jpg'
import card3 from './pexels-tina-nord-792416.jpg'
import Card1 from '../../atoms/Card1';

const Card=()=>{
    return(
        <center><div style={{marginLeft: '30px', marginRight: '30px', marginTop: '30px'}}>
            <div  class="row row-cols-1 row-cols-md-3 g-4">
  <div  class="col">
    <div style={{borderRadius:'30px'}} class="card">
      <img src={card11} style={{height: '19rem',objectFit:'cover',borderTopWidth:'3px',borderTopStyle:'solid',borderTopColor:'	#000080',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}} class="card-img-top" alt="..."/>
      <Card1 path={'/Dog'} title1={'Dog Products'} content1={'While the exact composition of dog food varies widely from one manufacturer to another, dog food generally is made up of meats, meat byproducts, cereals, grains,,proteins vitamins, and minerals ... etc.'}/>
    </div>
  </div>
  <div  class="col">
    <div style={{borderRadius:'30px'}} class="card">
      <img src={card2} style={{height: '19rem',objectFit:'cover',borderTopWidth:'3px',borderTopStyle:'solid',borderTopColor:'	#000080',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}} class="card-img-top" alt="..."/>
      <Card1 path={'/Cat'} title1={'Cat Products'} content1={'Cat food is food specifically designed for consumption by cats. cats have specific requirements for their dietary nutrients, namely nutrients found only in meat, such as taurine, arginine, and Vitamin B6.'}/>
    </div>
  </div>
  <div  class="col">
    <div style={{borderRadius:'30px'}} class="card">
      <img src={card3} style={{height: '19rem',objectFit:'cover',borderTopWidth:'3px',borderTopStyle:'solid',borderTopColor:'	#000080',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}} class="card-img-top" alt="..."/>
      <Card1 path={'/Bird'} title1={'Bird Products'} content1={'Bird food or bird seed is food (often varieties of seeds, nuts, and/or dried fruits) intended for consumption by wild and domestic birds. While most bird food is fed to commercial fowl (such as chicken or turkey), '}/>
    </div>
  </div>
  
</div>
        </div>
        </center>
    )
}
export default Card;