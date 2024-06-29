import React,{ useContext} from 'react';
import {    Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ requiresAdmin = false }) => {

    

    const { isAuthenticated } = useContext(AuthContext);

    
    
    if(!isAuthenticated){
        return <p>Not Authorized yet</p>
    }

    if(isAuthenticated){
        return <Outlet />
    }


    

//    if(isLoading){
//     //while authentication is being checked,show a loading indicator
//     return <div>Loading...</div>
//    }


//     //check if the user is authenticated
//     if(!isAuthenticated){
//         console.log(isAuthenticated)
//         return <Navigate to='/login' replace/>
//     }

//     //If requiresAdmin is true,check if the user is an Admin
//     if(requiresAdmin && (!memberData || !memberData.isAdmin)){
//         return <Navigate to='/' replace/>//Redirect to home if not an Admin
//     }

//     //If all checks pass, render the child routes
//     return <Outlet />
}

export default ProtectedRoute;