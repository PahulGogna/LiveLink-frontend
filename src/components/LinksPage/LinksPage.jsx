import { LinksContext } from "../../Contexts/LinksContext";
import { LoginContext } from "../../Contexts/LoginContext";
import DisplayLink from "./DisplayLink";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

function LinksPage(props) {

    const {links, setLinks} = useContext(LinksContext)
    const {user} = useContext(LoginContext)

    useEffect(()=>{
        if(user){
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
                }
        },[])

    return (
        <>
        <p style={{
            position:'absolute',
            top:'40px',
            right:'5px'
        }}>*The data is updated every 15 minutes</p>
            {user?<div className="LinksDiv">
                {links.map((linkData, index) => {
                    return <DisplayLink {...linkData} key={index} onLinkClick={() => {onLinkClick(index)}}/>
                })}
            </div>:<h1>You are not logged in, <Link to='/login' style={{color:'rgb(61, 251, 61)'}}>Login</Link></h1>}
        </>
    )
}

export default LinksPage