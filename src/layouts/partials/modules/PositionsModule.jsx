import { Link } from "react-router-dom"

import {
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react"

import {
    FaUsersCog
} from "react-icons/fa"

export default function CompaniesModule() {
    return (
        <Link to="/empresas" className="text-blue-gray-500">
            <ListItem className="text-black dark:text-white">
                <ListItemPrefix>
                    <FaUsersCog className="h-5 w-5" />
                </ListItemPrefix>
                Posiciones
            </ListItem>
        </Link>
    )
}