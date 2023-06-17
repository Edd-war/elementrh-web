import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import Layout from "./layouts/Layout.jsx"
import AllEmployees from "./views/employee/AllEmployees.jsx"
import EmployeeForm from "./views/employee/EmployeeForm.jsx";
import AllCompanies from "./views/company/AllCompanies.jsx";
import AllPositions from "./views/position/AllPositions.jsx";

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
                    path: "/posiciones",
                    element: <AllPositions />,
                },
                {
                    path: "/compañías",
                    element: <AllCompanies />,
                },
                {
                    path: "/empleados",
                    element: <AllEmployees />,
                },
                {
                    path: "/empleados/nuevo",
                    element: <EmployeeForm />,
                },
                {
                    path: "/empleados/edición/:id",
                    element: <EmployeeForm />,
                }
            ],
        }
    ]
);

export default BrowserRouter;