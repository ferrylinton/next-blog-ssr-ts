import React, { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";

const Layout = (props: PropsWithChildren) => {

    return (
        <>
            <Navbar/>
            <div className="z-0 mt-[60px]">
                {props.children}
            </div>

        </>
    );
};

export default Layout;