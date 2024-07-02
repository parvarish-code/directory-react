import axios from 'axios';
import { React,useEffect,useState} from 'react';

const BulletinBoard = () => {

    const [ messages,setMessages ] = useState([]);

    const renderMessages = messages.map(message => {
        return <li key={message._id}>{message.text}</li>
    })

    
    useEffect(()=>{

        const fetchMessages = async () => {

            try {
                const response = await axios.get('http://localhost:3001/bulletin');
                console.log(response.data.bulletin)
                setMessages(response.data.bulletin.messages);
            } catch (error) {
                console.log(error)
            }
           
        }
        fetchMessages();
    },[]);

    return (
        <>
            <h1 className='text-center mt-5'>Bulletin Board</h1>
           <ul>
            {renderMessages}
           </ul>
        </>
    )
}

export default BulletinBoard;