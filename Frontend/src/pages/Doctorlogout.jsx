import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log('Logout successful')
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    })

  return (
    <div>
      Captain logout
    </div>
  )
}

export default CaptainLogout
