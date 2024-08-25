import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LinksPage from './components/LinksPage/LinksPage.jsx'
import Layout from './Layout.jsx'
import Login from './components/LoginPage/Login.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import Account from './components/Account/Account.jsx'
import CreateMonitor from './components/CreateMonitor/CreateMonitor.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children: [
      {
        path:"/",
        element: <Login />
      },
      {
        path:'home',
        element: <LinksPage/>
      },
      {
        path:'signup',
        element:<SignUp/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'user',
        element:<Account/>
      },
    {
      path:'create',
      element:<CreateMonitor/>
    }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
