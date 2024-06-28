import React, { createContext,useEffect,useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ isAuthenticated,setIsAuthenticated] = useState(false);
    const [ memberData,setMemberData] = useState(null);
    const [ error,setError] = useState(null);
    const [ isLoading,setIsLoading] = useState(true);
    const [ token,setToken ] = useState(null);
    

    //   const login = async (email,password) => {
    //     try {
    //         const response = await axios.post('http://localhost:3001/login',{email,password});
    //         Cookies.set('token',response.data.token);
    //         setToken(response.data.token)

            
    //             setIsAuthenticated(true);
            
    //             setMemberData(response.data.member)
              
    //             setError(null);
    //             setIsLoading(false);
        
                
            
            
           
    //     } catch (error) {
    //         console.error('Error logging in:',error);
    //         setError('Invalid Credentials');
    //     }
    // }

    // const logout = () => {
    //     Cookies.remove('token');
    //     setToken(null);
    //     setIsAuthenticated(false);
    //     setMemberData(null);
    // }

    useEffect(()=>{
        const tokenValue = Cookies.get('token');
        setToken(tokenValue);
       
    
        const verifyToken = () => {
           if(Cookies.get('token')){
            try {
                axios.post('http://localhost:3001/verifyToken',{token:Cookies.get('token')})
                .then(response => {
                    
                    setIsAuthenticated(true);
                    setMemberData(response.data.member);
                    setIsLoading(false);
                })
            } catch (error) {
                setError('Error validating token')
                console.error('Invalid Token',error);
                // logout();//logout the user if token verification fails
            }

           }
           
              
             
        } 

        verifyToken()
    },[])
    


    return (
        <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated,memberData,setMemberData,error,setError,isLoading,setIsLoading,token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}