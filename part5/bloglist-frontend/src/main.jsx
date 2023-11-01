import ReactDOM from "react-dom/client";
import React from 'react';
import Store from "./store";
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={Store}>
<App />
</Provider>);
