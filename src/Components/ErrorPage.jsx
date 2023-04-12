import React from "react";

const ErrorPage = ({error}) =>{
    
    console.log('entered error page')
    return(
        <>
           <div className="App">
                <h1>Error Ocurred</h1>
                <p>{error}</p>
           </div>
        </>
    )
}

export default ErrorPage;