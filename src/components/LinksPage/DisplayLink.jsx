import { useContext } from "react"
import { LinksContext } from "../../Contexts/LinksContext"

function DisplayLink(props){

    const {links, setLinks} = useContext(LinksContext)

    let token = JSON.parse(window.localStorage.getItem('user')).Token

    function onLinkClick(linkData){
        let confirmation = confirm(`Delete the monitor for  ${linkData.url} ?`)
        if(confirmation){
            let delete_link = async () => {
                await fetch(import.meta.env.VITE_BEEP + `/link/delete/${linkData.id}`,{
                    method: 'delete',
                    headers:{
                        Authorization: `Bearer ${token}`}
                })
                .then(response => {
                    if(response.status == 204){
                        let newMonitors = links.filter((link) => link.id !== linkData.id)
                        setLinks(newMonitors)
                        window.localStorage.setItem('links', JSON.stringify(newMonitors))
                        alert('Monitor deleted')
                    }
                    else{
                        alert('Could not delete the monitor')
                    }
                })
        }
        delete_link()
        }
    }

    return (
        <>
        <span className="LinkBox">
            <div className="displayLink">
                <a className="displayUrl" target="_blank" href={props.url}>{props.url.replace(/(^\w+:|^)\/\//, '') || 'Loading...'}</a>
                <h5 style={{margin:'5px'}}>{props.running ? 'Running':'Paused'}</h5>

                <div className="shape-circle" id={props.running ? (props.working ? 'green': 'red'):'grey'}> <span className="shape-circle-text"><h5 style={{margin:'1px'}}>status code: {props.status_code || 'N/A'}</h5></span> </div>
                <button className="close" onClick={(event) => onLinkClick(props)}>&times;</button>
                </div>
        </span>
        </>
    )
}

export default DisplayLink