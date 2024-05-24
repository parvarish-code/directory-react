import React , {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const MemberEdit = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/members/${id}`,{name,email});
            navigate(`/members/${id}`);
        } catch (error) {
            setError(error)
            console.log('Error deleting member: ', error);
        }
    }



    useEffect(()=>{
        const fetchMember = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/members/${id}`);
                const memberData = response.data;
                setName(memberData.name);
                setEmail(memberData.email);
            } catch (error) {
                setError(error)
            } finally{
                setIsLoading(false);
            }
        }

        fetchMember();
    },[id]);

    if(isLoading){
        return <div>Loading Member...</div>
    }

    return (
        <>
        <h2>Edit Member</h2>
        {error && <div>Error fetching member : { error.message}</div>}
        <form onSubmit={handleSubmit}>

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
    </>
    )
}

export default MemberEdit;