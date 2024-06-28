import React , { useState } from 'react';
import { Form,Button,Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberRegister = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword){
            setError('Passwords do not match ');
            return;
        }

        try {
            await axios.post('http://localhost:3001/register',{
                name,
                email,
                password
            });

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            //Redirect to member list page
            navigate('/')
        } catch (error) {
            setError('Registeration failed.Please try again');
            navigate('/register')
        }
    }

    return (
        <div className='container mt-4'>
            <h2 className='mb-3'>Register as a Member</h2>
            { error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                        ></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>Register</Button>
            </Form>
        </div>
    )
}

export default MemberRegister;