import React from 'react'
import { useParams } from 'react-router-dom'
import Footer1 from '../../COMPONENTS/Footer/Footer1'
import Footer2 from '../../COMPONENTS/Footer/Footer2'
import Navbar from '../../COMPONENTS/Navbar/Navbar'
import SingleBanner from '../../COMPONENTS/Banners/SingleBanner'
import UserSidebar from '../../COMPONENTS/UserProfile/UserSidebar'
import AccountSettings from '../../COMPONENTS/UserProfile/AccountSettings'
import './UserProfile.css'
import ChangePassword from '../../COMPONENTS/UserProfile/ChangePassword'
import YourOrders from '../../COMPONENTS/UserProfile/YourOrders'
import UserAddress from '../../COMPONENTS/UserProfile/UserAddress'
import LegalNotice from '../../COMPONENTS/UserProfile/LegalNotice'

const UserProfile = () => {

    const {activepage} = useParams()


    // alert(activepage)
  return (
    <div className='userprofile'>
        <Navbar/>
        <SingleBanner 
        heading={`My Profile`}
        bannerimage = 'https://img.freepik.com/free-photo/cute-pet-collage-isolated_23-2150007427.jpg?w=1060&t=st=1696923471~exp=1696924071~hmac=29fcbfcaeab5e407b59df48eca02e684e150e1604a57025c105dc67d790fafd0' 
        />
        {/* UserProfile , showing {activepage}
         */}

         <div className='userprofilein'>
            <div className='left'>
              <UserSidebar activepage={activepage}/>
            </div>
            <div className='right'>
              {activepage === 'accountsettings' && <AccountSettings/>}
              {activepage === 'changepassword' && <ChangePassword/>}
              {activepage === 'yourorders' && <YourOrders/>}
              {activepage === 'address' && <UserAddress/>}
              {activepage === 'legalnotice' && <LegalNotice/>}
            </div>
         </div>
        <Footer1/>
        <Footer2/>
        </div>
  )
}

export default UserProfile