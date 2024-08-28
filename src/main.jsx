import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import SettingsPage from "./pages/settingsPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "settings",
		element: <SettingsPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<RouterProvider router={router} />,
	// </React.StrictMode>,
);
