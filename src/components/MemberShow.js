import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

const MemberShow = ( { memberId } ) => {
    const [member,setMember] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this member?')){
            try {
                await axios.delete(`http://localhost:3001/members/${id}`);
                navigate('/');
            } catch (error) {
                console.log('Error deleting member: ', error);
            }
        }
    }

    const navigateToEditPage = (id) => {
        navigate(`/members/${id}/edit`);
    }

    useEffect(()=>{
        const fetchMember = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/members/${id}`);
                setMember(response.data);
            } catch (error) {
                setError(error)
            } finally{
                setIsLoading(false);
            }
        }

        fetchMember();
    },[id])

    if (isLoading){
        return <div>Loading member details...</div>
    }

    if(error){
        return <div>Error fetching member: {error.message}</div>
    }

    if(!member){
        return <div>Member not found</div>
    }

    return (
        <div className='container mt-4'>
            <div className='card'>
                <div className='card-header'>
                <h2 className='card-title'>Member Details</h2>
                </div>
                <div className='card-body'>
                    <p className='card-text'>
                        <strong>Name:</strong> {member.name}
                    </p>
                    <p className='card-text'>
                        <strong>Email:</strong> {member.email}
                    </p>
                </div>
                <div className='card-footer d-flex justify-content-between'>
                    <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
                    <button onClick={()=>navigateToEditPage(id)} className='btn btn-secondary'>Edit</button>
                </div>
            </div>
            
        </div>
    )
}

export default MemberShow;