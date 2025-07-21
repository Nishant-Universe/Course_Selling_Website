import React from 'react'
import  { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Purchases() {
   const [purchase, setPurchase] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    const [errorMessage,setErrorMessage]=useState("");
   
     

  
    console.log("Purchases:", purchase);
    
  
    // Check token
    useEffect(() => {
     
      const token = localStorage.getItem("user");
      
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
  
    // Fetch courses
    useEffect(() => { 
      const token = JSON.parse(localStorage.getItem("user"));
       const fetchPurchase=async()=>{
       
    
    //if user not login
    if(!token){
      setErrorMessage("login to purchase courses")
      toast.error("login to purchase courses")
      return 
    }
    try {
    
      const response=await axios.get("http://localhost:4001/api/v1/user/purchases",{
        headers:{
          Authorization:`Bearer ${token}`
        },
        withCredentials:true,
      })
    
      setPurchase(response.data.courseData)
      

      
       } catch (error) {
        setErrorMessage( error|| "fail to fetch data")
       
      
    }
    

  }
  fetchPurchase()
      
    }, []);
  
    // Logout
    const handleLogout = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/user/logout", {
          withCredentials: true,
        });
        
        toast.success(response.data.message);
        localStorage.removeItem("user");
        setIsLoggedIn(false);
      } catch (error) {
        console.log("Error in logging out ", error);
        toast.error(error.response.data.errors || "Error in logging out");
      }
    };
     const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
    
   
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gradient-to-r from-blue-900 to-red-900 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-500 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-8 bg-gradient-to-r from-red-900 to-blue-900 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">
          My Purchases
        </h2>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Render purchases */}
        {purchase.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchase.map((purchase, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-6 mb-6"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Course Image */}
                  <img
                    className="rounded-lg w-full h-48 object-cover"
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200"
                    }
                    alt={purchase.title}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{purchase.title}</h3>
                    <p className="text-gray-500">
                      {purchase.description.length > 100
                        ? `${purchase.description.slice(0, 100)}...`
                        : purchase.description}
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no purchases yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchases