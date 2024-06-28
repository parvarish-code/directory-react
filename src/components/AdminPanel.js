import React , { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

const AdminPanel = () => {
    const [members,setMembers] = useState([]);

    useEffect(()=>{
        const fetchMembers = async () => {
            try {
                const token = Cookies.get('token');
                
                const response = await axios.get('http://localhost:3001/members',{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem(token)}`
                    }
                });
                setMembers(response.data);
            } catch (error) {
                console.log('Error fetching members',error)
            }
        }

        fetchMembers();
    },[]);

    return (
        <div className='container mt-4'>
            <h2>Admin Panel</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member)=>{
                        return <tr key={member._id}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>
                                <Link to={``} className='btn btn-sm btn-secondary me-2'>
                                    Edit
                                </Link>
                                <button className='btn btn-sm btn-danger'>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default AdminPanel