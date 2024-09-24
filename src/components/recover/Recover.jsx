import React, { useState } from 'react'
import "./Recover.css"
import { useNavigate } from 'react-router-dom'

function Recover() {
    const [visibility, setVisibility] = useState("password")
    const navigate = useNavigate()

    function func(){
        setVisibility(visibility === 'password'?'text':'password')
    }

    async function sendRequest() {
        let newPass = passForm.new_password.value
        let confPass = passForm.confirm_password.value
        if(!(newPass === confPass)){
            alert("passwords should match")
            return 
        }
        if(newPass.length < 8){
            alert("password should be atleast 8 characters long")
            return
        }

        let dataToSend = {'password':newPass}
        let token = new URLSearchParams(location.search).get("token")
        
        if(!token){
            alert("Could not verify your identity")
        }
        else{
            fetch(import.meta.env.VITE_BEEP + '/password/recover',{
                            method: "post",
                            headers:{Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',},
                            body:JSON.stringify(dataToSend)
                        }).then(
                            (data) => data.json()
                        ).then(
                        (final) => {
                            alert(final.detail)
                            navigate('../login')
                        }
                        ).catch(() => {
                            alert("some error occured")
                        })
        }
    }

  return (
    <div className="grid">
        <h2>Password Recovery</h2>
        <form method="POST" id="password-recovery-form" name='passForm' onSubmit={(e)=>{
            e.preventDefault()
            sendRequest()
            }}>
            <div className="input-group">
                <label htmlFor="new-password">New Password</label>
                <input type={visibility} id="new-password" name="new_password" required/>
            </div>
            <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type={visibility} id="confirm-password" name="confirm_password" required/>
            </div>
            <img src={!(visibility==='password')?'https://cdn-icons-png.flaticon.com/512/8395/8395688.png':'https://cdn-icons-png.flaticon.com/512/6423/6423885.png'} onClick={func} 
                        style={{
                                width:'7%',
                                cursor:"pointer",  
                                marginRight:'5px',
                                marginLeft:'7px', 
                                flex:.13,
                                filter:'invert(25%)'               
                            }}
                    />
            <button type="submit">Reset Password</button>
        </form>
    </div>
  )
}

export default Recover
