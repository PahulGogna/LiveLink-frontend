
function Link(props){

    return (
        <>
        <span className="LinkBox">
            <div className="displayLink">
                <a className="displayUrl">{props.url.replace(/(^\w+:|^)\/\//, '') || 'Loading...'}</a>
                <h5 style={{margin:'5px'}}>{props.running ? 'Running':'Paused'}</h5>

                <div className="shape-circle" id={props.running ? (props.working ? 'green': 'red'):'grey'}> <span className="shape-circle-text"><h5 style={{margin:'1px'}}>status code: {props.status_code || 'N/A'}</h5></span> </div>
                </div>
        </span>
        </>
    )
}

export default Link