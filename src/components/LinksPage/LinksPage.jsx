import { LinksContext } from "../../Contexts/LinksContext";
import { LoginContext } from "../../Contexts/LoginContext";
import Link from "./Link";
import { useState, useEffect, useContext } from "react";

function LinksPage(props) {

    const {links, setLinks} = useContext(LinksContext)


    useEffect(()=>{
        
        let token = JSON.parse(window.localStorage.getItem('user')).Token

        let data = () =>  fetch(import.meta.env.VITE_BEEP + '/link/get/all',{
                                headers:{Authorization: `Bearer ${token}`}
                            }).then(data => {
                                if (data.ok){
                                    return data.json()
                                }
                                throw new console.error(('Could not connect to the backend'));
                                                                
                            })
                        .then(result => 
                                {
                                    if (result.detail){
                                        return
                                    }
                                    else{
                                        setLinks(result)
                                        window.localStorage.setItem('links', JSON.stringify(result))
                                    }
                            }).catch((r) => {console.log('')})
                data()
            },[])

    return (
        <>
        <div className="LinksDiv">
            {links.map((linkData, index) => {
                return <Link {...linkData} key={index} onLinkClick={() => {onLinkClick(index)}}/>
            })}
        </div>
        </>
    )
}

export default LinksPage