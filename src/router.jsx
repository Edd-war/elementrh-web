import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Layout from "./layouts/Layout.jsx"

const BrowserRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/index",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <App />,
                },
                {
                    path: "/app",
                    element: <App />,
                },
            ],
        }
    ]
);

export default BrowserRouter;