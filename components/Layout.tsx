import React, { PropsWithChildren, useState } from "react";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Navbar from "./Navbar";

const Layout = (props: PropsWithChildren) => {
    // style={{ "backgroundImage": "url('/images/pg-bg.jpg')" }}
    return (
        <ScrollArea.Root className="w-screen h-screen overflow-hidden ">
            <ScrollArea.Viewport className="scrol-area-viewport vie z-0 relative w-full h-full">
                <Navbar />
                <div className="flex flex-col w-full h-full min-w-[350px]">
                    <div className="w-full grow pt-[50px] flex justify-center bg-gradient-to-br from-slate-50 to-slate-300">
                        {props.children}
                    </div>
                    <footer className="w-full flex-none ">
                        <div className="bg-slate-600 text-slate-50 text-center p-3">&copy; Copyright 2023 marmeam.com</div>
                    </footer>
                </div>

            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
                className="z-50 flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical">
                <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
                className="z-50 flex select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="horizontal">
                <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="bg-blackA8" />
        </ScrollArea.Root>


    );
};

export default Layout;