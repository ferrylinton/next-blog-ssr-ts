import MenuIcon from '@/icons/MenuIcon';
import React, { useState } from 'react';
import NavLink from './NavLink';
import CloseIcon from '@/icons/CloseIcon';


const Navbar = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full  z-30  border-b border-b-slate-300 bg-white">
        <div className='w-full flex justify-center items-center'>
          <div className="w-full justify-between items-center md:flex max-w-4xl">
            <div className={`flex items-center justify-between h-[50px] transition-all ease-in-out duration-500 ${open ? 'border-b border-gray-200' : ''}`}>
              <a className={`text-3xl font-bold ml-5 lg:ml-0 lowercase leading-none tracking-wide font-righteous`} href="#">marmeam</a>
              <div className="leading-none mr-5 md:hidden">
                <button
                  className="leading-none text-gray-600 outline-none w-[30px] h-[30px] transform  focus:rotate-180 transition duration-500 ease-in-out"
                  onClick={() => setOpen(!open)}>
                  {open ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
            <div className={`flex-1 justify-self-center md:block md:mr-0 transition-all ease-in-out duration-500 overflow-hidden ${open ? 'max-h-96 shadow-lg md:shadow-none' : 'max-h-0 md:max-h-96'}`}>
              <div className="flex items-center justify-center m-3 md:m-0 flex-col md:flex-row md:justify-end">
                <NavLink onClick={() => setOpen(false)} href="/">Home</NavLink>
                <NavLink onClick={() => setOpen(false)} href="/post">Post</NavLink>
                <NavLink onClick={() => setOpen(false)} href="/tag">Tag</NavLink>
                <NavLink onClick={() => setOpen(false)} href="/about">About</NavLink>
              </div>
            </div>

          </div>
        </div>
      </nav>
      <div onClick={() => setOpen(false)} className={` bg-gray-600 opacity-20 fixed inset-0 ${open ? 'z-20' : 'hidden'}`} />
    </>
  )
}

export default Navbar