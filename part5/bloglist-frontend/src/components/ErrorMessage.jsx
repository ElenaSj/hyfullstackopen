import { useSelector } from "react-redux";

const ErrorMessage = () => {

    const message = useSelector(state => state.message.errormessage)
  
      return (
      <>
      {message &&
      <div className="error">{message}</div>}
      </>
      )
  };

export default ErrorMessage