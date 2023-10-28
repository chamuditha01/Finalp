
import HeaderDoctor from "../../components/molecules/HeaderDoctor/HeaderD";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DoctorPage=()=>{
    const location = useLocation();
  const docid1 = location.state && location.state.docid1;
    return(
        <div>
            <HeaderDoctor/>
            
        </div>
    )
}
export default DoctorPage;