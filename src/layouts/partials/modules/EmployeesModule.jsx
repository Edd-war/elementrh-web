import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react"

import {
    FaChevronDown as ChevronDownIcon,
    FaUsers as UsersIcon,
    FaList as ListIcon,
    FaPlus as PlusIcon,
} from "react-icons/fa"

export default function EmployeesModule({handleOpen, open}) {
    return (
        <Accordion
            open={open === 1}
            icon=
            {
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
            }
        >
            <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                    <ListItemPrefix className="text-black dark:text-white">
                        <UsersIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal text-black dark:text-white">
                        Empleados
                    </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                    <Link to="/empleados" className="text-black dark:text-white">
                        <ListItem>
                            <ListItemPrefix>
                                <ListIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            Mostrar todos
                        </ListItem>
                    </Link>
                    <Link to="/empleados/nuevo" className="text-black dark:text-white">
                        <ListItem>
                            <ListItemPrefix>
                                <PlusIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            Nuevo empleado
                        </ListItem>
                    </Link>
                </List>
            </AccordionBody>
        </Accordion>
    )
}

EmployeesModule.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    open: PropTypes.number.isRequired,
}