import React , {useState,useEffect} from 'react';
import axios from 'axios';

const MemberEdit = ({memberId}) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3001/members/${memberId}`,{name,email});
            console.log('Member Updated');
        } catch (error) {
            console.log('Error deleting member: ', error);
        }
    }



    useEffect(()=>{
        const fetchMember = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/members/${memberId}`);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                setError(error)
            } finally{
                setIsLoading(false);
            }
        }

        fetchMember();
    },[memberId]);

    return (
        <form onSubmit={handleSubmit}>
        <h2>Edit Member</h2>
        <div>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <button type='submit'>Edit Member</button>
    </form>
    )
}

export default MemberEdit;