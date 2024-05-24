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
        <div>
            <h2>Member Details</h2>
            <p><strong>Name:</strong> {member.name}</p>
            <p><strong>Email:</strong>{member.email}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => {navigateToEditPage(id)}}>Edit</button>
        </div>
    )
}

export default MemberShow;