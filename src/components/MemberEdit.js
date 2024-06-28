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
        <div className='container mt-4'>
        <h2 className='mb-3'>Edit Member</h2>
        {error && <div className='alert alert-danger'>Error fetching member : { error.message}</div>}
        <form onSubmit={handleSubmit} className='needs-validation noValidate'>

        <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name:</label>
            <input type='text' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} required/>
            <div className='invalid-feedback'>Please provide a name</div>
        </div>
        <div className='mb-3'>
            <label htmlFor='email' className='form-label'>Email:</label>
            <input type='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <div className='invalid-feedback'>Please provide an email</div>
        </div>
        <button type='submit' className='btn btn-primary'>Update Member</button>
    </form>
    </div>
    )
}

export default MemberEdit;