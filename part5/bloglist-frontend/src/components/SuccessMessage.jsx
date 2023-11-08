import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const SuccessMessage = () => {
  const message = useSelector((state) => state.message.successmessage);

  return <>{message && <Alert severity="success">{message}</Alert>}</>;
};

export default SuccessMessage;
