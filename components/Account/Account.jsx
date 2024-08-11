import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../Contexts/LoginContext'
import "./Account.css"
import { Link } from 'react-router-dom'
import { LinksContext } from '../../Contexts/LinksContext'

function Account() {
    const {user} = useContext(LoginContext)
    const {links} = useContext(LinksContext)
    const [userDetails, setUserDetails] = useState(JSON.parse(window.localStorage.getItem('userDetails'))||{})

    let token = JSON.parse(window.localStorage.getItem('user')).Token

    useEffect(()=>{
        if(user){
            fetch(import.meta.env.VITE_BEEP + '/users/get',{
                headers:{Authorization: `Bearer ${token}`}
            }).then(data => data.json()).then(result =>
                {
                    console.log(result)
                    if (result.detail){
                        return
                    }
                    else{
                        setUserDetails(result)
                        window.localStorage.setItem('userDetails', JSON.stringify(result))
                    }
            })
        }
    }, [])

    function handleDelete(){

      let token = JSON.parse(window.localStorage.getItem('user')).Token

      let input = prompt(`Enter Your username: "${userDetails.name}" to confirm`)

      if(input === userDetails.name){
        let delete_user = async () => {
          await fetch(import.meta.env.VITE_BEEP + `/users/delete`,{
              method: 'delete',
              headers:{
                  Authorization: `Bearer ${token}`}
          })
          .then(response => {
              if(response.status == 204){
                window.localStorage.setItem('user', false)
                window.localStorage.removeItem('links')
                window.localStorage.removeItem('userData')
                alert('Account deleted')
                navigate('../')
                window.location.reload()
              }
              else{
                  alert('Could not delete your Account')
              }
          })
        }
        delete_user()
      }
      else{
        alert('The username does not match')
      }
    }

    function handleChangePass(){
      fetch(import.meta.env.VITE_BEEP + '/users/update',{
              headers:{Authorization: `Bearer ${token}`},
              body:'password'
            })
            .then(data => data.json()).then(result =>{})
    }


  return (
    <div>
      {user?
      <>
        <h1>Welcome, <u style={{color:'rgb(61, 251, 61)'}}>{userDetails.name || 'Name'}</u></h1>
        <br />
        <br />
          <table className='linkDataTable' border="1" width="50%" align="center" cellPadding="0" cellSpacing='0'>
            <tbody>

                <tr>
                  <td colSpan='3'><h3>Your Monitor Data</h3></td>
                </tr>
                  <tr>
                    <td>Active Monitors</td>
                    <td>Working Links</td>
                    <td>Total Monitors</td>
                  </tr>
                  <tr>
                    <td><h2>{links ? links.filter(link => link.running).length : 0}</h2></td>
                    <td>{links ? links.filter(link => link.working).length ? <h2 style={{color:'rgb(61, 251, 61)'}}>{links.filter(link => link.working).length}</h2>: <h2 style={{color:'rgb(242, 112, 112)'}}>0</h2>:'0'}</td>
                    <td><h2>{links ? links.length:0}</h2></td>
                  </tr>
                  <tr>
                    <td align='right' colSpan={'3'}>
                        *The data is updated every 10 minutes
                    </td>
                  </tr>
              </tbody>
          </table>
        
        <h2 id='heading'>Permanent Actions</h2>
        <div className='AccountButtons'>
          <button className='account-button' id='reset-pass' onClick={handleChangePass}>Change Password</button>
          <button className='account-button' id='delete' onClick={handleDelete}>Delete Account</button>
        </div>

      </>
      :<h1>You are not logged in, <Link to='/login' style={{color:'rgb(61, 251, 61)'}}>Login</Link></h1>}

    </div>
  )
}

export default Account