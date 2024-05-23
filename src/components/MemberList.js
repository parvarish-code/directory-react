import React , { useState,useEffect} from 'react';
import axios from 'axios';

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
            <h2>Member List</h2>
            <ul>
                {
                    members.map(member => (
                        <li key={member._id}>
                            {member.name} ({member.email})
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MemberList;
