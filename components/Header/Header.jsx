import { Link } from "react-router-dom"


function Header(){
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
                                <li><Link to="#">Your Monitors</Link></li>
                                <li><Link to="#">Create Monitor</Link></li>
                            </ul>
                        </nav>
                        <button>Your Account</button>
                        <button id='logout' onClick={()=> handleLogout()}>Log Out</button>
                    </>: ""}
                </header>
            </>
        )
}

export default Header