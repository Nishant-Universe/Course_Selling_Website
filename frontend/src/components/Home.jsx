import React from 'react'
import tailwindConfig from '../../tailwind.config';
import logo from "../../public/logo.jpeg"
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div class="bg-gradient-to-r from-black to-blue-950 ">
        <div class="h-screen text-white container mx-auto" >
            {/*Header*/}
            <header class="flex  items-center justify-between p-6 ">
                <div className='flex  items-center space-x-2'>
                    <img src={logo} alt="" className="w-10 h-10 rounded" />
                <h1 className='text-2xl text-orange-700 font-bold'>E-course</h1>
                </div>
                <div  className='space-x-4'>
                <Link to={"/login"} className="bg-transparent text-white py-2 px-4 border border-white rounde">login</Link>
                    <Link to={"/signup"} className="bg-transparent text-white py-2 px-4 border border-white rounded">signup </Link>
              
                
                </div>
            </header>
            {/*main section*/ }
            <section>section1</section>
            <section>section2</section>

            {/*footer */}
            <footer>footer</footer>
        </div>
        
        </div>
  )
}

export default Home;