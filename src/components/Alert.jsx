import React from "react";
import {Toast} from "primereact/toast";

const Alert = (WrappedComponent) => (props) => {
  const toastRef = React.createRef()

  const showMessage = ({ type}) => {
    if(type === "success"){
      toastRef.current.show({
        severity:"success",
        summary:"Success",
        detail: "Payment Successful"
      })
    }else{
      toastRef.current.show({
        severity:"error",
        summary:"Error",
        detail: "Payment Failed"
      })
    }
  }

    return <div>
            <Toast ref={toastRef}/>
            <WrappedComponent {...props} showMessage = {showMessage}/>
            </div>    
}

export default Alert