import React from 'react';
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Header from '../components/Header';
import ProductList from '../pages/Products';
import Wishlist from '../pages/Wishlist';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Cart from '../pages/Bag';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { authState: { isLoggedId=false } } = useAuth();
  const location = useLocation();
  return isLoggedId ? <Outlet /> : <Navigate to="" state={{ from: location }} replace />
}

// how to login and logout using this token 
// how to accees route and refresh if fail in intersection
// other login logot scenarios
// ErrorBoundry
// -----------done---------
// how to presist when refresh
// seesion based login

// font
// optimisation

// redux toolkit - list add, wishlist addredd checkout, payment, header status

// how many ways for protected route
// role based login
// multi lang
// dark ligh theme
// search filter sidebar, details

// if user is idle for 5 minute then logout 

//1. login and logout with [`jwt accesstoken and refreshToken`] and
{/**
1.  store by Browser `refreshToken` in cookie in browser 
2. `refreshToken` use to to generate accessToken access resources.
3. pass in API call and keep this accessToken in state AuthProvider and remove when logout.
4. refreshToken is remove while making api call in logout in backend 
5. even we cannot access refreshToken with Javascript and it is secure
6. when refresh manual you logout
7. we no need to manula send refreshToken while generating the accessToken that is send by browser we only pass {withCredentials: true} in api call 
8. 
  
*/}
//2. login and logout with [`jwt token`]  and store in localStorage and while logut remove from localStorage
//3. login and logout with [`jwt token`]  and store in sessionStorage and while logut remove from sessionStorage
//4. login and logout with accesstoken and refreshToken  and store in localStorage. and while logut remove from localStorage.

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mainContent" >
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/bag" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
           <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
