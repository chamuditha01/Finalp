import Footer1 from "../../components/molecules/Footer1";
import Form1 from "../../components/molecules/Form";
import Navbar from "../../components/molecules/Navbar"

import './Signin.css'

const SignIn1=()=>{
    return(
        <div class="sign">
            <p style={{marginTop:'1px'}}>.</p>   
            <Navbar/>
            <Form1/> 
            <p style={{marginTop:'1px'}}>.</p>  
            <Footer1/>  
        </div>
       
    )
}
export default SignIn1;