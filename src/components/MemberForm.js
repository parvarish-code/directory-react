import React , { useState } from 'react';
import axios from 'axios';

const MemberForm = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(name)
        console.log(email)

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
        <form onSubmit={handleSubmit}>
            <h2>Add New Member</h2>
            <div>
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <button type='submit'>Add Member</button>
        </form>
    )
};

export default MemberForm; 