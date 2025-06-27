import React, {use, useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token') 
    const navigate = useNavigate()
    const { user , setUser} = React.useContext(UserDataContext);
    const [ isLoading, setIsLoading] = React.useState(true);
     
    console.log(token);

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token ])

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log('user profile fetched successfully')
            setUser(response.user)
            setIsLoading(false)
        }
    }).catch((error) =>{
        console.log(error);
        localStorage.removeItem('token')
        navigate('/login') 
    },[token])

    if(isLoading) {
        return(
            <div>Loading.....</div>
        )
    }

  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper
