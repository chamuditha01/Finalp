import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../COMPONENTS/Navbar/Navbar';
import './AuthPage.css';
import supabase from '../../../../lib/helper/superbaseClient';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userId:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginOwner = async () => {
        try {
          
          const { data: customerData, error: customerError } = await supabase
            .from('Customer')
            .select('Customer_id')
            .eq('email', formData.email);
      
          if (customerError) {
            alert('Error querying Customer data: ' + customerError.message);
            return;
          }
      
          if (customerData && customerData.length > 0) {
            const userId = customerData[0].Customer_id;
      
            
            const { data: upsertData, error: upsertError } = await supabase.from('Product_Buyer').upsert([
              {
                Product_Buyer_id: userId,
                
              }
            ]);
      
            if (upsertError) {
              alert('Error inserting data into Pet_Owner1:', upsertError);
            } else {
              alert('Data inserted successfully into Product_Buyer:', upsertData);
            }
          } else {
            alert('User not found with the provided email.');
          }
        } catch (error) {
          alert('An error occurred:', error);
        }
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Insert user data into the "users" table
        const { data, error } = await supabase
            .from('Customer')
            .upsert([
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            ]);

        if (error) {
            alert('Error inserting user data:', error);
        } else {
            alert('User data inserted successfully');
            handleLoginOwner();
            // You can add redirection or other actions here after successful signup.
        }
    };

    return (
        <div className='authpage'>
            <Navbar reloadnavbar={false} />

            <div className='authcont'>
                <img
                    src='https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
                    alt='Signup Cat'
                />

                <form className='authform' onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='name'>First Name</label>
                            <input type='text' name='name' onChange={handleChange} required />
                        </div>
                        <div className='formgroup'>
                            <label htmlFor='lname'>Last Name</label>
                            <input type='text' name='lname' required />
                        </div>
                    </div>
                    <div className='formgroup'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' onChange={handleChange} required />
                    </div>

                    <div className='form-group-row'>
                        <div className='formgroup'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' onChange={handleChange} required />
                        </div>
                        <div className='formgroup'>
                            <label htmlFor='password'>Confirm Password</label>
                            <input type='password' name='password' required />
                        </div>
                    </div>

                    <Link to='/loginshop' className='stylenone'>
                        <p>Already have an account?</p>
                    </Link>
                    <button type='submit' className='btn'>Signup</button>
                    <Link to='/Homeshop' className='stylenone'>
                        <button className='btn'>back</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;
