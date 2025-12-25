import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/DoctorContext.jsx'
import CartProvider  from './context/CartContext.jsx'
// import UserProtectedWrapper from './pages/UserProtecedWrapper.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CartProvider>
   <CaptainContext>
   <UserContext>
      <BrowserRouter>
      {/* <UserProtectedWrapper> */}
        <App />
      {/* </UserProtectedWrapper> */}
      </BrowserRouter>
    </UserContext>
   </CaptainContext>
   </CartProvider>
  // </StrictMode>,
)
