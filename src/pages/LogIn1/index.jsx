

import Footer1 from "../../components/molecules/Footer1"
import FormLogin from "../../components/molecules/FormLogin"
import Navbar from "../../components/molecules/Navbar"

import './Login1.css'

const LogIn1=()=>{
    return(
        <div class="log">
            
            <Navbar/>
            <p style={{marginTop:'1px'}}>.</p>    
            <FormLogin/> 
            <p style={{marginTop:'160px'}}>.</p>    
            <Footer1/>
            
        </div>
       
    )
}
export default LogIn1;