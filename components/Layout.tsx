import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props: PropsWithChildren) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Navbar/>
            <div className="z-0">
                {props.children}
            </div>

        </>
    );
};

export default Layout;