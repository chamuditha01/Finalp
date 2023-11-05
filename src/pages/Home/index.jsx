
import './styles.css'
import Header from "../../components/molecules/Header/Header";
import Doctor from '../../components/molecules/Doctor';
import Footer from '../../components/molecules/Footer/Footer';
import Footer2 from '../Petshop/COMPONENTS/Footer/Footer2';

const Home =()=>{ 
  return(
    <div>
      
        <Header/>
        <Doctor/>
        <Footer2/>
    </div>
  )
}
export default Home;