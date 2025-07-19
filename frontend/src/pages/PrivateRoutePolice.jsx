import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutePolice = ({children}) => {
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
  return isAuthenticated ? children:<Navigate to='/policelogin'/>;
}
export default PrivateRoutePolice