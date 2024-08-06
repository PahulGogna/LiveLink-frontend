import { useState, useEffect } from "react";
import "./Login.css"

function Login (props){

    const [user, setUser] = useState(false);
    
    function handleLogin(props){
        let formData = new FormData
        
        formData.append('username',document.getElementById('login__Email').value)
        formData.append('password',document.getElementById('login__password').value)
        
        let getServerData = () => fetch('http://127.0.0.1:8000' + '/users/login',{
                    method: "post",
                    body:formData
                })
                .then(response => response.json())
                .then(data => {
                    if(data.Token){
                        window.localStorage.setItem('user', JSON.stringify(data))
                        setUser(data)
                        props.onSubmit(true)
                        window.location.reload()
                    }
                })
        
                try{
                    getServerData().then(()=>{
                        if (user.Token){
                            props.onSubmit(true)
                        }
                        else{
                            props.onSubmit(false)
                        }
                    })
                }
                catch{
                    props.onSubmit(false)
                }
    }

    return (
        <div className="grid">
            <form method="POST" className="form login" onSubmit={(e)=>{e.preventDefault()
                console.log('submitted')
                handleLogin(props)
            }}>
                <input autoComplete="Email" id="login__Email" type="text" name="Email" className="form__input" placeholder="Email" required />
                <input id="login__password" type="password" name="password" className="form__input" placeholder="Password" required/>
                <input type="submit" value="Sign In" onSubmit={() => {}}/>
            </form>
        </div>
    )
}

export default Login