import { useSelector } from "react-redux";

const SuccessMessage = () => {

    const message = useSelector(state => state.message.successmessage)
  
      return (
      <>
      {message &&
      <div className="success">{message}</div>}
      </>
      )
  };

export default SuccessMessage