import React , { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/AuthContext';
import Cookies from 'js-cookie';

const MainNavbar = () => {

    const { isAuthenticated,setIsAuthenticated,memberData,setMemberData,token,setToken } = useContext(AuthContext);

    const logout = () => {
        Cookies.remove('token');
        setToken(null);
        setIsAuthenticated(false);
        setMemberData(null);
    }

    return (
        <Navbar bg='primary' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand href='/'>
                    direactoryApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/members/add'>Add Member</Nav.Link>
                            {
                                !isAuthenticated?
                                <>
                                <Nav.Link href='/login'>Login</Nav.Link>
                                <Nav.Link href='/register'>Register</Nav.Link>
                                </> :
                                (
                                    <>
                                    <Nav.Link href='/bulletin'>Bulletin</Nav.Link>
                                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                                    <Nav.Link>{memberData.name}</Nav.Link>
                                    </>
                                )
                            }
                           
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar;