import Navbarprofile from '../../components/molecules/Navbarprofile';
import imagebak from './cbak1.jpg'

const Service = () => {
  return (
    <div >
     
      <div className="back"style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),url(${imagebak})` }}><Navbarprofile/>
      </div>  </div>
  );
};
export default Service;
