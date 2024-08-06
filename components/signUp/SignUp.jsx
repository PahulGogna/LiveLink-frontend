import './signUp.css'

function SignUp(){
    return (
        <>
            <div className="grid">

            <form action="" method="POST" className="form signUp">

                    <input autoComplete="Username" id="signUp__Username" type="text" name="Username" className="form__input" placeholder="Username" required />

                    <input autoComplete="Email" id="signUp__Email" type="text" name="Email" className="form__input" placeholder="Email" required />

                    <input id="signUp__password" type="password" name="password" className="form__input" placeholder="Password" required/>

                    <input type="submit" value="Sign Up"/>

            </form>

            </div>
        </>
    )
}

export default SignUp