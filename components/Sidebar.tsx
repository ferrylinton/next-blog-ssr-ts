import React from "react";
import classNames from "classnames";
import HomeIcon from "@/icons/HomeIcon";

type Props = {
    open: boolean;
};

const Sidebar = ({ open }: Props) => {

    return (

        <nav className={classNames('z-30 w-[250px] fixed top-0 left-0 h-screen overflow-auto', {
            "bg-slate-700": true,
            "text-white": true,
            "transition-transform .3s ease-in-out lg:-translate-x-0": true,
            "-translate-x-full ": !open
        })}>
            <div className="overflow-auto">
                <div className="hidden lg:block text-center my-5 font-alkatra tracking-wide">
                    <span className="text-3xl font-bold">marmeam</span>
                    <span className="text-xl text-green-400">.com</span>
                </div>
                <ul className="flex flex-col py-4 space-y-1">
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-slate-200">Menu</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">About</span>
                        </a>
                    </li>
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-slate-200">Data</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">User</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Role</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Authority</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Post</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Tag</span>
                        </a>
                    </li>
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-slate-100">Setting</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Login</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-5 h-5 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Register</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>


    );
};
export default Sidebar;
