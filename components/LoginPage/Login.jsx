import { useState, useEffect, useContext } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

function Login (props){

    const {user, setUser} = useContext(LoginContext)
    const navigate = useNavigate()
    console.log(user)
    
    function handleLogin(props){
        let formData = new FormData
        
        formData.append('username',document.getElementById('login__Email').value)
        formData.append('password',document.getElementById('login__password').value)
        
        let getServerData = () => fetch(import.meta.env.VITE_BEEP + '/users/login',{
                    method: "post",
                    body:formData
                })
                .then(response => response.json())
                .then(data => {
                    if(data.Token){
                        window.localStorage.setItem('user', JSON.stringify(data))
                        setUser(data)
                        navigate("../home")
                    }
                    else{
                        console.log('Invalid credentials')
                        alert('Invalid Credentials')
                    }
                })
        
                try{
                    getServerData().then(()=>{
                        if (user.Token){
                        }
                        else{
                            return false
                        }
                    })
                }
                catch{
                    props.onSubmit(false)
                }
    }

    return (
        <>
            {user? 
            <>
            <h1>You are already logged in, <Link to='/home' style={{color:'rgb(61, 251, 61)'}}>Back To Home</Link></h1>
            
            </>
            :<div className="grid">
                <h1>Welcome Back!</h1>
                <form method="POST" className="form login" onSubmit={(e)=>{e.preventDefault()
                    handleLogin(props)
                }}>
                    <input autoComplete="Email" id="login__Email" type="text" name="Email" className="form__input" placeholder="Email" required />
                    <input id="login__password" type="password" name="password" className="form__input" placeholder="Password" required/>
                    <input type="submit" value="Sign In"/>
                </form>
                <p className="text--center">Don't have an account? {' '}
                    <Link to='/signup'>
                        SIGN UP
                    </Link>
            </p>
            </div>}
        </>
    )
}

export default Login