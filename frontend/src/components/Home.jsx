import React, { useEffect, useState } from 'react'
import logo from "/logo.png"
import {Link} from "react-router-dom"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from 'react-hot-toast';

function Home() {


  {/**useState is used to store data fetch from backend  ,where setC ourse is function and courses is variable*/}
  const [courses,setCourses]=useState([])
  {/** is user logged in  */}
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  {/**get token from local storage */}
  useEffect(()=>{
    const token=localStorage.getItem("user")
    if(token){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])



  {/**handle logout of user */}
  const handleLogout=async()=>{
    try{
      const response= await axios.get("http://localhost:4001/api/v1/user/logout",{
      withCredentials:true,
    })
    localStorage.removeItem("user");
    toast.success( response.data.message)


    setIsLoggedIn(false);

    }
    catch(error){
      console.log("error in  Logging out",error)
      toast.error( "error in logging out")

    }
  }
  {/**useEffect run the code in first render */}
  useEffect(()=>{
    {/**call backend by using function ,useEffect first time render the code take object and empty dependency array*/}
  const fetchCourses =async()=>{
    try {
      const response=await axios.get("http://localhost:4001/api/v1/course/courses",
        {
          withCredentials:true,
        }
      );
      console.log(response.data);
      {/**give the data to setCourses which is fetch frm backend to store in courses variable */}
      setCourses(response.data.course);
   
    } catch (error) {
      console.log("error in fetch courses",error)
      
    }
    
  };
  fetchCourses();
},[])
 
var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 1,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay:true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay:true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay:true
        }
      }
    ]
  };



  


  return (
    <div className=' min-h-full  w-full  bg-gradient-to-r from-blue-600  to-red-900 '>
        <div className="min-h-screen text-white container mx-auto py-4" >
            {/**header */}

            <header className='flex item-center justify-between  ml-9'> 
                   <div className='flex  items-center space-x-1'>
                    <img src={logo} alt="" className='w-15 h-20 rounded-full' /> 
                    <h1 className=' text-4xl text-pink-500 font-bold'> AN-Learning</h1>
                    </div>

                     <div className='p-7 space-x-4 '>
                     {isLoggedIn? (
                      <button onClick={handleLogout} className='bg-transparent text-white py-3 
                      px-4 border border-white rounded'>Logout</button>
                     ):
                     <>
                      <Link  to={"/Login"} className='bg-transparent text-white py-3 
                      px-4 border border-white rounded'>Login</Link>
                      <Link to={"/signup"}  className='bg-transparent text-white py-3 px-4 border border-white rounded'>Signup</Link>
                     </>}
                     </div>
            </header>


            {/**main section */}
            <section className='text-center'>
                      <h1 className='text-7xl font-bold text-pink-500 '>AN-Learning</h1>
                      <br />
                      <br />
                      <p className='text-white font-semibold'> Continious Learning ,Keep Growing</p>
                      
                      <div className='mt-7'>
                        <Link to={"/courses"} className="bg-yellow-600 text-white font-semibold hover:bg-red-600 duration-300  border rounded py-3 px-4" >Courses</Link>
                        
                      </div>

                      
            </section>
            <section>

              

              <Slider {...settings}>
                 {
                  courses.map((course)=>(

                    <div key={course.id} className='p-4'>
                      <div className='relative flex-shrink-0 w-92 transition-transform duration-300 hover:scale-105'>
                        <div className='bg-gray-900 rounded-lg overflow-hidden'>
                          <img  className='h-32 w-full object-contain'src={course.image.url} alt="image not found" />
                          <div className='p-6 text-center '>
                            <h2 className='text-xl font-bold text-yellow-400'>{course.title}</h2>
                            <button className='bg-red-400 text-white py-2 px-4 rounded-full hover:bg-yellow-400 duration-500'>Get Now </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
               
        
              </Slider>
            </section>

            {/**footer */}
           <hr />
            <footer className='my-5'> 
              <div className='grid grid-cols-1 md:grid-cols-3 ml-9' >
                  <div>
                    <div className='flex  items-center space-x-1'>
                      <img src={logo} alt="" className='w-12 h-9 rounded-full' /> 
                      <h1 className='text-2xl text-pink-500 font-bold'> AN-Learning</h1>
                    </div>
                    
                    <div className='mt-3 '>  
                      <p className='mb-1'>Follow us</p>
                      <div className='flex space-x-3'>
                         <a href=""><FaTwitter className='text-2xl hover:text-blue-300'/></a>
                         <a href=""><FaFacebook className='text-2xl hover:text-blue-900'/></a>
                         <a href=""><FaInstagram className='text-2xl hover:text-pink-600'/></a>
                       </div>

                    </div>
                   </div>
                   
                   <div className=' items-center '>
                    <h2 className='text-lg font-semibold'>Connects</h2>
                     <ul className=' space-y-2 text-gray-400'>
                      <li className='hover:text-white cursor-pointer duration-300'>Youtube</li>
                      <li className='hover:text-white cursor-pointer duration-300'>Telegram</li>
                      <li className='hover:text-white cursor-pointer duration-300'>LinkedIn</li>
                     </ul>
                   </div>
                   <div>
                    <h2 className='text-lg font-semibold'>Copyrights &#169; 2025</h2>
                     <ul className=' space-y-2 text-gray-400'>
                      <li className='hover:text-white cursor-pointer duration-300'>T&C</li>
                      <li className='hover:text-white cursor-pointer duration-300'>Privacy</li>
                      <li className='hover:text-white cursor-pointer duration-300'>Help</li>
                     </ul>
                   </div>
              </div>
            </footer>
        </div>
    </div>
  )
}

export default Home