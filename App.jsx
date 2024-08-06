import { useEffect, useState } from 'react'
import './App.css'
import LinksPage from './components/LinksPage/LinksPage';
import Login from './components/LoginPage/Login';
import SignUp from './components/signUp/SignUp';
import { createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import LinkPage from './components/LinksPage/LinkPage';

function App() {

  const [user, setUser] = useState(window.localStorage.getItem('user') == "false"? false:true);
  const [signin, setSignin] = useState(true);

  useEffect(()=>{
    if(user){

    }
  },[user])

  function handleLogin(value){
    setUser(value? true:false)
  }

  function handleLogout(){
    let confirmation = confirm('Do you want to logout?')
    if(confirmation){
      if(window.localStorage.getItem('user') !== 'false'){
        window.localStorage.setItem('user', false)
        window.localStorage.removeItem('links')
        setUser(false)
      }
    }
  }


  return (
    <>
      <header>
          <img src="../assets/logo.svg" alt="Logo" />
          {user ? <>
              <nav>
                  <ul className="side-panel">
                      <li><a href="#">Your Monitors</a></li>
                      <li><a href="#">Create Monitor</a></li>
                  </ul>
              </nav>
              <a href="#">
                  <button>Your Account</button>
                  <button id='logout' onClick={()=> handleLogout()}>Log Out</button>
              </a>
          </>: ""}
      </header>


      <div className='pageBody'>
        {user ? 
        <LinksPage /> :<>
        <h1>Welcome{signin?" Back!":'!'}</h1>
        {
          (signin? <Login onSubmit={value => handleLogin(value)}/>: <SignUp />)
      }
        <p className="text--center">{signin ? "Don't have an account? ": "Already have an account? "} 
          <a onClick={()=>{setSignin((sign) => !sign)
          }}>
          {signin ? "SIGN UP":"SIGN IN"}
        </a></p>
          </>}
      </div>
    
    </>
  )


}

export default App