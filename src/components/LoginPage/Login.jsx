import { useState, useEffect, useContext } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

function Login (props){

    const {user, setUser} = useContext(LoginContext)
    const navigate = useNavigate()
    const [forgotPass, setForgotPass] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [visibility, setVisibility] = useState('password')

    if(!window.localStorage.getItem('user')){
        setUser(false)
        window.localStorage.setItem('user', false)
    }
    
    function handleLogin(){

        setButtonClicked(true)
        
        let resetFunc = () => {
            let data = {'email':document.getElementById('login__Email').value}

            if(data.email){
                fetch(import.meta.env.VITE_BEEP + '/password/mail',{
                                        method: "post",
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body:JSON.stringify(data)
                                    }).then(data => data.json()).then(
                                        response => {
                                            if(response.success){
                                                alert(response.details)
                                                setForgotPass(false)
                                            }
                                            else{
                                                alert(response.detail.detail)
                                            }
                                            setButtonClicked(false)
                                        }
                                    ).catch(setButtonClicked(false))
                                }
            }

        
        let getServerData = () => {
            let formData = new FormData

            formData.append('username',document.getElementById('login__Email').value)
            formData.append('password',document.getElementById('login__password').value)
            
            fetch(import.meta.env.VITE_BEEP + '/users/login',{
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
                        setButtonClicked(false)
                    }
                })
                .catch(setButtonClicked(false))
            }
        
        try{
            if (forgotPass){
                resetFunc()
            }
            else{
                getServerData().then(()=>{
                if (user.Token){
                }
                else{
                        return false
                    }
                })
            }
        }
        catch{
            setButtonClicked(false)
            return
        }
    }

    function func(){
        setVisibility(visibility === 'password'?'text':'password')
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
                    handleLogin()
                }}>
                    <input autoComplete="Email" id="login__Email" type="text" name="Email" className="form__input" placeholder="Email" required />
                    {forgotPass ? '': <input id="login__password" type={visibility} name="password" className="form__input" placeholder="Password" required/>}
                    {forgotPass ? '':<div style={{
                        display:'inline-flex',
                        alignContent:'end'
                    }}>
                    {!(visibility==='password')?'Hide':'Show'} password
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
                    </div>}
                    <a href="https://www.flaticon.com/free-icons/password" title="password icons"></a>
                    <input type="submit" value={buttonClicked? 'loading':forgotPass? "RESET":"Sign In"} disabled={buttonClicked}/>
                </form>
                <p className="text--center">{forgotPass? 'Get a password reset mail':'Forgot Password?'} <a onClick={()=> setForgotPass(!forgotPass)}>{forgotPass? 'CANCEL':'Reset Password'}</a></p>
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