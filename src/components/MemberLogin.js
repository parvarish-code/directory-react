import React , { useState,useContext} from "react";
import { Form, Button,Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import axios from 'axios';
import Cookies from 'js-cookie';



const MemberLogin = () => {
    const [ email,setEmail ] = useState('');
    const [ password,setPassword] = useState('');
    const { isAuthenticated,setIsAuthenticated,setMemberData,error,setError,setIsLoading,token,setToken } = useContext(AuthContext);//Get login function from context
    
const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login',{email,password});

            Cookies.set('token',response.data.token);
            
            setToken(response.data.token)
            
            setIsAuthenticated(true);
            
            setMemberData(response.data.member)
          
            setError(null);
            setIsLoading(false);

            navigate('/')
            
        } catch (error) {
            setError('Invalid Credentials');
            console.error('Error logging in:',error);
        }

    }

    return (
        <div className='container mt-4'>
            <h2 className="mb-3">Login</h2>
            {error && <Alert variant='danger'>{error}</Alert>}

            

            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="Enter email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>Login</Button>
            </Form>
        </div>
    )
}

export default MemberLogin;