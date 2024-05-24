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
        <div>
            <h2 className="text-3xl font-bold underline">Member List</h2>
            <ul>
                {
                    members.map(member => (
                        <li key={member._id}>
                            <Link to={`/members/${member._id}`}>
                            {member.name} ({member.email})
                            </Link>
                            
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MemberList;
