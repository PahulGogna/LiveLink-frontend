import React, { useContext } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { LinksContext } from '../../Contexts/LinksContext'
import { LoginContext } from '../../Contexts/LoginContext'
import { Link } from 'react-router-dom'

function CreateMonitor() {
    const navigate = useNavigate()
    const {setLinks} = useContext(LinksContext)
    const {user} = useContext(LoginContext)

    function handleAdd(){
        let url = document.getElementById('InputUrl').value

        let token = JSON.parse(window.localStorage.getItem('user')).Token

        let req = async () => await fetch(import.meta.env.VITE_BEEP + '/link/create',
            {
                method:'Post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({'url':url}),
            }
    ).then(
            result => {
                if(!result.ok){
                    if(result.status == 400){
                        alert('Could not validate the url')
                        throw console.error('Invalid URL');
                    }
                    else{
                        alert('Some Error Occured, server responded with : '+`${result.status}`)
                        throw console.error('');
                    }
                }
                return result.json()
            }
        ).then(data => {
            if(!data.success){
                alert(data.detail)
            }
            else{
                let newLinks = JSON.parse(window.localStorage.getItem('links'))
                newLinks = [...newLinks, data.detail]
                window.localStorage.setItem('links', JSON.stringify(newLinks))
                setLinks(newLinks)
                navigate("../home")
            }
        }
    ).catch(
        ()=>{return}
    )
    
    if(url){
        req()
    }
    
    }


return (
    <>
        {user?<table cellSpacing={13} align='center'>
            <tbody>
                <tr>
                    <td colSpan={2}><input type="text" name="" id="InputUrl" placeholder='Enter URL'/></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button style={{width:'10vw'}} onClick={() => handleAdd()}>Create</button>
                    </td>
                </tr>
            </tbody>
        </table>:<h1>You are not logged in, <Link to='/login' style={{color:'rgb(61, 251, 61)'}}>Login</Link></h1>}
    </>      
  )
}

export default CreateMonitor
