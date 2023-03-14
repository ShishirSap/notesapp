import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom';
const AuthContext=createContext()
export default AuthContext


export const AuthProvider = ({children}) => {
  let navigate=useNavigate()
  let [loading,setLoading]=useState(true)
  
  
  let [user,setUser]=useState(localStorage.getItem('authtoken')?jwt_decode(JSON.parse(localStorage.getItem('authtoken')).access):null)
    let [authtoken,setAuthtoken]=useState(localStorage.getItem('authtoken')?JSON.parse(localStorage.getItem('authtoken')):null)

  const loginUser=async (e)=>{
        e.preventDefault()
   let response=await fetch('/api/token/',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})

   })
   let data=await response.json()
   console.log(response)
   console.log(data)
   if (response.status===200){
    setAuthtoken(data)
    setUser(jwt_decode(data.access))
    localStorage.setItem('authtoken',JSON.stringify(data))
    navigate('/')
   }
   else{
    alert('Something went wrong')
   }

    }

const logoutUser=()=>{
  setUser(null)
  setAuthtoken(null)
  localStorage.removeItem('authtoken')
  navigate('/signup')

}
const updateToken=async ()=>{
  let response= await fetch('/api/token/refresh/',{
   method:'POST',
   headers:{
       'Content-Type':'application/json'
   },
   body:JSON.stringify({'refresh':authtoken?.refresh})

  })
  let data=await response.json()

  if (response.status===200){
   setAuthtoken(data)
   setUser(jwt_decode(data.access))
   localStorage.setItem('authtoken',JSON.stringify(data))
   navigate('/')
  }
  else{
   logoutUser()
  }

   if(loading){
    setLoading(false)
   }
}
useEffect(()=>{
  if(loading){
    updateToken()
  }

 let interval=setInterval(()=>{
 if(authtoken){
  updateToken()
}
},1000*60*4)
return ()=>clearInterval(interval)

},[authtoken,loading])
    let contextData={
        tokens:authtoken,
        loginUser:loginUser,
        user:user,
        logoutUser:logoutUser
    }


  return (
  <AuthContext.Provider value={contextData} >
    {loading?null:children}
  </AuthContext.Provider>
  )
}


