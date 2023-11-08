import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const ErrorMessage = () => {
  const message = useSelector((state) => state.message.errormessage);

  return <>{message && <Alert severity="error">{message}</Alert>}</>;
};

export default ErrorMessage;
