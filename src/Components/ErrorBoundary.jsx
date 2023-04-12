import React from "react";
import '../CSS/container.css'
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false , errorString:""};
    }
  
    static getDerivedStateFromError(error) {
      console.log('ERROR: ', error.message)
      const errMsg = error.message + "\n\n" + error.stack
      return { hasError: true ,  errorString:errMsg};
    }
  
    render() {
    
      if (this.state.hasError) {

        return (
            <div className="container">
                <div className="center">
                    <h1>Something went wrong, Error is posted below.</h1>
                    <p>{this.state.errorString}</p>
                </div>
                
            </div>
       
        );
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;