
function LinkPage(props){
    return (
        <>
            <div className="opened-link-container">
                <h2 className="display-url">{props.url.replace(/(^\w+:|^)\/\//, '') || "display Link"} </h2>
                
            </div> 
        </>
    )
}

export default LinkPage