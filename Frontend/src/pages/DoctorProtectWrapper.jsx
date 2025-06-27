import React, {use, useContext, useEffect} from 'react'
import { CaptainDataContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token') 
    const navigate = useNavigate()
    const {captain,  setCaptain} = React.useContext(CaptainDataContext);
    const [  isLoading, setIsLoading ] = React.useState(true);
     
    console.log(token);
    

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token ])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers:{
            Authorization: `Bearer ${token}`
        } 
    }).then((response) => {
        if (response.status === 200) {
            console.log('captain profile fetched successfully')
            setCaptain(response.data.captain)
            setIsLoading(false)
        }
    }).catch((error) => {
        console.log(error);
        localStorage.removeItem('token')
        navigate('/captain-login')
    })

    if (isLoading) {
        return(
            <div>Loading....</div>
        )
    }


  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper
