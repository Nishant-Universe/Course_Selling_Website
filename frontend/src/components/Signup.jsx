import React, { useState } from 'react'
import logo from "/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'

function Signup() {
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
   const [errorMessage,setErrorMessage]=useState("");

  {/**function for handle submit  receive event default */}

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:4001/api/v1/user/signup",{
        firstName,lastName,email,password},{
          withCredentials:true,
          header:{
            "Content-Type":"application/json",
          }

        })
        console.log("Signup sucessful",response.data)
        toast.success(response.data.message);
         navigate("/Login");
    } catch (error) {
    if(error.response){
       setErrorMessage(error.response.data.error);
    }
      
     
      
    }

  }
  return (
  
   
    <div className=' min-h-full  w-full  bg-gradient-to-r from-blue-600  to-red-900  '>
        <div className="min-h-screen text-white container mx-auto py-4 items-center justify-center" >
            {/**header */}

            <header className='flex item-center justify-between  ml-9'> 
                   <div className='flex  items-center space-x-1'>
                    <img src={logo} alt="" className='w-15 h-20 rounded-full' /> 
                    <h1 className=' text-4xl text-pink-500 font-bold'> AN-Learning</h1>
                    </div>

                     <div className='p-7 space-x-4 '>
                      <Link  to={"/Login"} className='bg-transparent text-white py-3 
                      px-4 border border-white rounded'>Login</Link>
                      <Link to={"/signup"}  className='bg-transparent text-white py-3 px-4 border border-white rounded'>Join Now</Link>
                     </div>
            </header>


            {/**Signup Form */}

            <div className='bg-gray-900 p-8 rounded-lg w-[500px] mt-20 align-middle'>
             <h2 className='text-2xl font-bold mb-4 text-center'> Signup Form 
              <span className='text-pink-500'> AN-Learning</span>
             </h2>
             <p className='text-center text-gray-400 mb-6'>Signup To Join Us</p>


             <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='firstname' className='text-gray-400 mb-2 '> Firstname</label>
                <input type="text"
                id="firstname"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700  focus:outline-none focus:ring-2  focus-ring-blue-500"
                placeholder="Type Your First Name"
                required

                />
                 </div>
                 <div className='mb-4'>
                <label htmlFor='lasttname' className='text-gray-400 mb-2'> Lastname</label>
                <input type="text"
                id="lastname"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700  focus:outline-none focus:ring-2  focus-ring-blue-500"
                placeholder="Type Your Last Name"
                required

                />
                 </div>
                 <div className='mb-4'>
                <label htmlFor='email' className='text-gray-400 mb-2'> Email</label>
                <input type="text"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700  focus:outline-none focus:ring-2  focus-ring-blue-500"
                placeholder="Type Your E-mail"
                required
                />
                 </div>

                 <div className='mb-4'>
                <label htmlFor='password' className='text-gray-400 mb-2'> Password</label>
                <div className='relative'>
                <input type="text"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700  focus-outline:none focus:ring-2  focus-ring-blue-500"
                placeholder="Type Your Password"
                required

                />
                <span className='absolute right-3 top-3 text-gray-500 cursor-pointer'></span>
                 </div>
                 </div>
                 {errorMessage && (
                  <div className=' mb-4 text-red-600 text-center'>
                    {errorMessage}
                  </div>
                 )}
                 <button
                 type='submit'
                 className='w-full bg-pink-500  hover:bg-yellow-400 text-white py-3 px-6 rounded-md transition cursor-pointer'> Sign Up</button>
                 
                 
             </form>


            </div>

          </div>
    </div>
  )
}

export default Signup