import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MemberShow = ( { memberId } ) => {
    const [member,setMember] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this member?')){
            try {
                await axios.delete(`http://localhost:3000/members/${memberId}`);
                console.log('Member Deleted');
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
                const response = await axios.get(`http://localhost:3000/members/${memberId}`);
                setMember(response.data);
            } catch (error) {
                setError(error)
            } finally{
                setIsLoading(false);
            }
        }

        fetchMember();
    },memberId)

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
            <button onClick={() => {navigateToEditPage(memberId)}}>Edit</button>
        </div>
    )
}

export default MemberShow;