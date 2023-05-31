import React from "react";
import classNames from "classnames";
import HomeIcon from "@/icons/HomeIcon";
import InfoIcon from "@/icons/InfoIcon";
import TagIcon from "@/icons/TagIcon";
import PostIcon from "@/icons/PostIcon";
import PeopleIcon from "@/icons/PeopleIcon";
import LoginIcon from "@/icons/LoginIcon";
import RegisterIcon from "@/icons/RegisterIcon";
import UsersIcon from "@/icons/UsersIcon";
import PasswordIcon from "@/icons/PasswordIcon";
import RoleIcon from "@/icons/RoleIcon";
import AuthorityIcon from "@/icons/AuthorityIcon";
import LogoutIcon from "@/icons/LogoutIcon";
import Link from "next/link";

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
                    <li>
                        <Link href="/" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <HomeIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <InfoIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">About</span>
                        </Link>
                    </li>
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-slate-400">Data</div>
                        </div>
                    </li>
                    <li>
                        <Link href="/data/post" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <PostIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Post</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/data/tag" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <TagIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Tag</span>
                        </Link>
                    </li>
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-slate-400">User Management</div>
                        </div>
                    </li>
                    <li>
                        <Link href="/usermanagement/user" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <UsersIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">User</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/usermanagement/role" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <RoleIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Role</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/usermanagement/authority" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <AuthorityIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Authority</span>
                        </Link>
                    </li>
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="text-sm font-light tracking-wide text-slate-400">Setting</div>
                        </div>
                    </li>
                    <li>
                        <Link href="/login" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <LoginIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/logout" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <LogoutIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/changepassword" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <PasswordIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Change Password</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/register" className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-slate-800 text-slate-100 hover:text-white border-l-4 border-transparent hover:border-green-400 pr-6">
                            <RegisterIcon className="w-4 h-4 ml-4" />
                            <span className="ml-2 text-sm tracking-wide truncate">Register</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>


    );
};
export default Sidebar;
