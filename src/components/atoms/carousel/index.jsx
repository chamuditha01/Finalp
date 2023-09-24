import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css'

const Carousel = () => {
  return (
    <div>
        
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        
       
      > 
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/c5.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption">
            <h1 className="header__title fw__6">Surgery</h1>
            <p className="para__text">Our surgery theater is fully equipped and capable of performing variety of surgeries for your canine and feline friends.</p>
                   
              
            </div>
          </div>
          <div className="carousel-item">
            <img src="images/c3.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption">
            <h1 className="header__title fw__6">Home visits for pets</h1>
            <p className="para__text">Home Visits are when a pet sitter comes over to your home for a short visit to check in on your pet, feed and water them, and even take them out for a walk.</p>
                    
              
            </div>
          </div>
          <div className="carousel-item">
            <img src="images/c1.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption">
            <h1 className="header__title fw__6">Inward care & Boarding</h1>
            <p className="para__text">Inward care and Boarding will help clients to leave their pet’s with us when they are sick or to board them when necessary</p>
                   
              
            </div>
            </div>
          <div className="carousel-item">
            <img src="images/c4.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption">
            <h1 className="header__title fw__6">Pet’s shop and Pharmacy</h1>
            <p className="para__text">Inward care and Boarding will help clients to leave their pet’s with us when they are sick or to board them when necessary</p>
                    
              
            </div>
          </div>
          <div className="carousel-item">
            <img src="images/c2.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption">
            <h1 className="header__title fw__6">OPD</h1>
                    <p className="para__text">Our OPD is functioning from 8.00am to 8.00pm to give you the best veterinary care and friendly service.</p>
                    
            </div>
          </div>
          
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
  );
};

export default Carousel;
