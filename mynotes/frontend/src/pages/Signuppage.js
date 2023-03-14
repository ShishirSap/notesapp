import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'






const Signuppage = () => {
  let {loginUser}=useContext(AuthContext)
  
  return (
<div className='flex w-screen h-screen justify-around'>
  <div className='w-[1/3] pt-[12rem] text-center'>
      <img  className='w-[24rem]' src={require('../assets/logo.png')} alt='logo'/>
  </div>
<div className='w-[35rem] p-10 border-2 border-slate-300 my-20 rounded-xl'>
  <div className='mb-4'>  <p className='font-bold  text-xl text-center'>Login</p>
  <p className='text-sm text-center'> Welcome user to our notes app</p>
</div>
  <form onSubmit={loginUser} className='flex flex-col gap-6 p-8'>
    <div className='flex flex-col gap-4'>
      <label for='username' className=''>Username</label>
      <input id="username" className='rounded bg-slate-300 text-gray-700 p-4 placeholder-gray-500 ' placeholder='enter your username' />
    </div>
    <div className='flex flex-col gap-4'>
      <label for='password' className=''>Password</label>
      <input id="password" placeholder='enter your password' className='rounded bg-slate-300 text-gray-700 p-4 placeholder-gray-500 ' />
    </div>
    <div className='text-center'>
      <input type='submit' className='py-2 px-8 mt-4 rounded  bg-[#DC143C] text-white ' value='Login'/>
    </div>
  </form>
  </div>   
</div>


   
  )

}

export default Signuppage
