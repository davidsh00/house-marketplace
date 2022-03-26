import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import {useAuthStatus}from '../hooks/useAuthStatus'
const PrivateRoute=()=> {

const {loggedIn,checkingStatus}=useAuthStatus()

if(checkingStatus){
  return<h1 className="text-4xl font-extrabold">Loading....</h1>
}
return loggedIn?<Outlet/>:<Navigate to="/sign-in"/>
}

export default PrivateRoute;
