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
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Member List</h2>
            <ul className="list-none p-0">
                {
                    members.map(member => (
                        <li key={member._id} className="member-card">
                            <Link to={`/members/${member._id}`}>
                            <h3>{member.name}</h3>
                            <p>{member.email}</p> 
                            </Link>
                            
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MemberList;
