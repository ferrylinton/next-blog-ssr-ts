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
    <nav className='lg:hidden fixed top-0 left-0 z-30 border-b border-slate-200 w-full h-[50px] flex justify-between lg:justify-center items-center bg-white' >
      <Link className='text-3xl font-bold ml-5 lg:ml-0 lowercase leading-none tracking-wide font-alkatra' href="#">
        <span className="text-3xl font-bold">marmeam</span>
        <span className="text-xl text-green-600">.com</span>
      </Link>
      <button className={`rounded w-[50px] h-[50px] p-3 lg:hidden text-slate-600 hover:text-slate-700`} onClick={onMenuButtonClick}>
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
