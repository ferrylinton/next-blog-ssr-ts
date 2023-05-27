import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import CloseIcon from "@/icons/CloseIcon";
import MenuIcon from "@/icons/MenuIcon";
type Props = {
  sidebarOpen: boolean,
  onMenuButtonClick(): void;
};
const Navbar = ({ sidebarOpen, onMenuButtonClick }: Props) => {
  return (
    <nav className={`lg:hidden fixed top-0 left-0 z-30  w-full h-[48px] flex justify-between lg:justify-center items-center bg-slate-700 border-y  ${sidebarOpen ? 'border-slate-600' : 'border-slate-700'} `} >
      <Link className='text-3xl font-bold ml-5 lg:ml-0 lowercase leading-none tracking-wide font-alkatra' href="#">
        <span className="text-3xl font-bold text-white">marmeam</span>
        <span className="text-xl text-green-400">.com</span>
      </Link>
      <button className={`rounded w-[50px] h-[50px] p-3 lg:hidden text-slate-200 hover:text-white`} onClick={onMenuButtonClick}>
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
