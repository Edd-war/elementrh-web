import { Link } from "react-router-dom"

import {
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react"

import {
    FaIndustry
} from "react-icons/fa"

export default function CompaniesModule() {
    return (
        <Link to="/compañías" className="text-blue-gray-500">
            <ListItem className="text-black dark:text-white">
                <ListItemPrefix>
                    <FaIndustry className="h-5 w-5" />
                </ListItemPrefix>
                Compañías
            </ListItem>
        </Link>
    )
}