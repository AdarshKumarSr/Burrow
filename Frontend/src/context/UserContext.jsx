// import React, { useState } from 'react'
import React, { createContext , useState} from 'react'
export const UserDataContext = createContext()

const UserContext = ({children}) => {
  const [user, setUser] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
  
      const updateUser = (captainData) => {
          setUser(captainData);
      }
  
      const value = {
          user,
          setUser,
          isLoading,
          setIsLoading,
          error,
          setError,
          updateUser
      };
  
  //  const [user, setUser] = useState({
  //   email:'',
  //   fullname:{
  //       firstname:'',
  //       lastname:''
  //   }
  //  })
  return (
    
      <div>
        <UserDataContext.Provider value={value}>
          {children}
        </UserDataContext.Provider>
        </div>
  )
}

export default UserContext
