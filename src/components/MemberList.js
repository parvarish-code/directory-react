import React , { useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MemberList = () => {
    const [members,setMembers] = useState([]);

    useEffect( () => {
       
        const fetchMembers = async () => {
            try {
                const result = await axios.get('http://localhost:3001/members');
                setMembers(result.data);
            } catch (error) {
                console.log(error)
            }
           
        };

        fetchMembers();
    },[]);

    return (
        <div className='container mt-4'>
            <h2 className='display-4 mb-3'>Member List</h2>
            <div className='row'>
            
                {
                    members.map(member => (
                        <div className='col-lg-4 col-md-6 mb-4' key={member._id}>
                            <div className='card h-100'>
                                <div className='card-body d-flex flex-column'>
                                    <h5 className='card-title'>{member.name}</h5>
                                    <p className='card-text'>{member.email}</p>
                                    <div className='mt-auto'>
                                        <Link to={`/members/${member._id}`} className='btn btn-primary'>View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MemberList;
