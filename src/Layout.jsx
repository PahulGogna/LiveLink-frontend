// import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { LoginContext } from "./Contexts/LoginContext";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import { LinksContext } from "./Contexts/LinksContext";

function Layout (){
    const [user, setUser] = useState(window.localStorage.getItem('user') == 'false'? false:true)
    const [links, setLinks] = useState(JSON.parse(window.localStorage.getItem('links'))||[])
    
    return(
        <div className='main'>
            <LoginContext.Provider value={{user, setUser}}>
                <Header />
                <div style={{margin:'20vh'}}></div>
                    <LinksContext.Provider value={{links, setLinks}}>
                        <Outlet />
                    </LinksContext.Provider>
                <div style={{margin:'20vh'}}></div>
            </LoginContext.Provider>
            <Footer/>
        </div>
    )
}

export default Layout