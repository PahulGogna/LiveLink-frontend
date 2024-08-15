import { useContext, useState } from 'react'
import './signUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../Contexts/LoginContext'
import useVerificationHook from 'react-code-hook'


function SignUp(){
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(null)
    const [verifying, setVerifying] = useState(false)
    const [serverCode, setServerCode] = useState(null)
    const { code, inputStates, inputClass, handleChange, handleKeyDown } = useVerificationHook(5);
    let tries = 0

    function handleSignUp(){
        let send = async () => await fetch(import.meta.env.VITE_BEEP + '/users/create',
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            })
            .then(request => request.json())
            .then(data => {
                    if(!data.success){
                        alert(data? data.detail:'An error occured')
                    }
                    else{
                        navigate('../login')
                    }
                }
            )
            send()
    }
    
    function handleEmailVerification(){
        let pass = document.getElementById('signUp__password').value
        let confPass = document.getElementById('confirm__password').value

        if(pass.length < 8){
            alert('The Password should be atleast 8 characters')
            return
        }
        if(pass !== confPass){
            alert('passwords do not match')
            return
        }

        let email = document.getElementById('signUp__Email').value
        let checkEmail = () => fetch(import.meta.env.VITE_BEEP + '/users/emailcheck',{
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({'email': email})
                }).then(response => 
                    {
                        if(response.status === 200){
                            return response.json()
                        }
                        else{
                            response.json().then(data => {
                                alert(data.detail.detail)
                                throw console.error(data.detail.detail)
                            })
                        }
                    })
                .then(data => {

                    setServerCode(data.code)
                    setNewUser({'email': email,
                                'name': document.getElementById('signUp__Username').value,
                                'password': pass})
                    setVerifying(true)
                })

        checkEmail()
    }

    return (
        <>
            {!verifying?
            <div className="grid">
                <h1>Welcome!</h1>
                <form method="POST" className="form signUp" onSubmit={(e)=>{e.preventDefault()
                    handleEmailVerification()
                }}>
                        <input autoComplete="Name" id="signUp__Username" type="text" name="Username" className="form__input" placeholder="Username" required />

                        <input autoComplete="Username" id="signUp__Email" type="text" name="Email" className="form__input" placeholder="Email" required />

                        <input id="signUp__password" type="password" name="password" className="form__input" placeholder="Password" required/>
                        <input id="confirm__password" type="password" name="password" className="form__input" placeholder="Confirm Password" required/>
                        <input type="submit" value="Sign Up"/>
                </form>
                <p className="text--center">Already have an account? {' '}
                    <Link to='/login'>
                        SIGN IN
                    </Link>
                </p>
        </div>: 
                <div className='OTP_Cont'>
                    <h3>Verify your email</h3>
                        {inputStates.map((state, ii) => {
                            return (
                                <input
                                    autoComplete='false'
                                    type="text" 
                                    pattern="[0-9]{5}"
                                    value={state.digit}
                                    className={inputClass}
                                    id='OTP_IN'
                                    key={ii}
                                    onChange={(e) => handleChange(e, ii)}
                                    onKeyDown={(e)=>{
                                        handleKeyDown
                                        if(code){
                                            if(e.key === "Enter"){
                                                if(parseInt(serverCode) === parseInt(code)){
                                                    // verified email
                                                    handleSignUp()
                                                }
                                                else{
                                                    if(tries > 5){
                                                        setServerCode(null)
                                                        alert('Unable to verify your email this time, please try again')
                                                        tries = 0
                                                        setVerifying(false)
                                                    }
                                                    else{
                                                        tries += 1
                                                        alert('Invalid Code, Try again')
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }/>
                            );
                        })}
                    <h3>Press enter to submit</h3>
                </div>}
        </>
    )
}

export default SignUp