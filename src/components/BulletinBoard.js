import axios from 'axios';
import { React,useEffect,useState} from 'react';
import { Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const BulletinBoard = () => {

    const [ messages,setMessages ] = useState([]);
    const [author,setAuthor] = useState(null);
    const { id } = useParams();

    const renderMessages = messages.map(message => {
        return (
            <Accordion defaultActiveKey='0' key={message._id} className='my-3'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{message.heading}</Accordion.Header>
                    <Accordion.Body>
                        {message.body}
                        <hr />
                        {message.date}
                        <hr />
                        {author.name}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    })

    
    useEffect(()=>{

        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/members/${id}`);
                
                setAuthor(response.data)
            } catch (error) {
                console.log(error);
            }
        }

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
        fetchAuthor();
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