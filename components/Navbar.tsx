import MenuIcon from '@/icons/MenuIcon';
import React, { useState } from 'react';
import NavLink from './NavLink';
import CloseIcon from '@/icons/CloseIcon';
import { Righteous } from 'next/font/google'

const righteous = Righteous({
    subsets: ['latin'],
    weight: '400'
})

const Navbar = () => {

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-20">
      <div className="justify-between items-center md:flex">

        <div className={`flex items-center justify-between h-[50px] transition-all ease-in-out duration-500 md:border-b-0 ${navbar ? ' border-b border-gray-200' : ''}`}>
          <a className={`text-3xl font-bold ml-5 lowercase leading-none ${righteous.className}`} href="#">marmeam</a>
          <div className="leading-none mr-5 md:hidden">
            <button
              className="leading-none text-gray-600 outline-none w-[30px] h-[30px] transform hover:rotate-180 transition duration-500 ease-in-out"
              onClick={() => setNavbar(!navbar)}>
              {navbar ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>


        <div className={`flex-1 justify-self-center bg-gray-100 md:bg-white md:block md:mr-5 transition-all ease-in-out duration-500 overflow-hidden ${navbar ? 'max-h-96 shadow-lg md:shadow-none' : 'max-h-0 md:max-h-96'}`}>
          <div className="flex items-center justify-center m-3 md:m-0 flex-col md:flex-row md:justify-end">
            <NavLink isActive={true} href="/">Home</NavLink>
            <NavLink href="/post">Post</NavLink>
            <NavLink href="/tag">Tag</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar