import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import Layout from "./layouts/Layout.jsx"
import AllEmployees from "./views/employee/AllEmployees.jsx"
import NewEmployee from "./views/employee/NewEmployee.jsx";

const BrowserRouter = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: 
            [
                {
                    path: "/welcome",
                    element: <App />,
                },
                {
                    path: "/empleados",
                    element: <AllEmployees />,
                },
                {
                    path: "/empleados/nuevo",
                    element: <NewEmployee />,
                },
            ],
        }
    ]
);

export default BrowserRouter;