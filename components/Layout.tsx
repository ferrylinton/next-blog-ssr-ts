import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const Layout = (props: PropsWithChildren) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Sidebar open={sidebarOpen} />
            <div className="ps-0 lg:ps-[250px] flex flex-col h-screen">
                <Navbar sidebarOpen={sidebarOpen} onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
                <div className="flex flex-col w-full h-full min-w-[350px] ">
                    <div className="w-full grow flex flex-col justify-center">
                        {props.children}
                    </div>
                    <footer className="w-full flex-none border-t border-slate-200">
                        <div className="text-center p-3">&copy; Copyright 2023 marmeam.com</div>
                    </footer>
                </div>
            </div>
            <div onClick={() => setSidebarOpen(false)} className={`z-10 bg-gray-600 opacity-20 fixed inset-0 ${sidebarOpen ? 'z-10 lg:hidden' : 'hidden'}`} />
        </>
    );
};

export default Layout;
