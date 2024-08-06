import Link from "./Link";
import { useState, useEffect } from "react";

function LinksPage(props) {

    const [links, setLinks] = useState(JSON.parse(window.localStorage.getItem('links'))||[])

    useEffect(()=>{
        
        let token = JSON.parse(window.localStorage.getItem('user')).Token

        let data = () =>  fetch('http://127.0.0.1:8000' + '/link/get/all',{
                                                headers:{Authorization: `Bearer ${token}`}
                                            }).then(data => data.json()).then(result => 
                                                {
                                                    console.log(result)
                                                    if (result.detail){
                                                        return
                                                    }
                                                    else{
                                                        setLinks(result)
                                                        window.localStorage.setItem('links', JSON.stringify(result))
                                                    }
                                            })
        data()
    },[])

    return (
        <>
            {links.map((linkData, index) => {
                return <Link {...linkData} key={index}/>
            })}
        </>
    )
}

export default LinksPage