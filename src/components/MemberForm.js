import React , { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/members',{
                name,
                email
            });

            console.log(response.data);//Log the response from the server

            //clear the form after submission
            setName('');
            setEmail('');

            
        } catch (error) {
            console.log('Error adding member:',error);
        }
    }

    return (
        <div className='container mt-4'>
            <h2 className='mb-3'>Add New Member</h2>
        <form className='needs-validation' noValidate onSubmit={handleSubmit}>
            
            <div className='mb-3'>
                <label htmlFor='name' className='form-label'>Name:</label>
                <input type='text' className='form-control'id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
                <div className='invalid-feedback'>Please provide a name</div>
            </div>
            <div className='mb-3'>
                <label htmlFor='email' classNamee='form-label'>Email:</label>
                <input type='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <div className='invalid-feedback'>Please provide an email</div>
            </div>
            <button type='submit' className='btn btn-primary'>Add Member</button>
        </form>
        </div>
    )
};

export default MemberForm; 