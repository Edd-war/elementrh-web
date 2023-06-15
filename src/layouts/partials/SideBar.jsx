import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './../../components/ThemeSwitcher';
import CompaniesModule from './modules/CompaniesModule';
import PositionsModule from './modules/PositionsModule';
import EmployeesModule from './modules/EmployeesModule';

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

import {
    FaHome as HomeIcon,
} from "react-icons/fa";
  
export default function SideBar() {
    const [open, setOpen] = useState(0);
    
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    
    return (
        <Card className="flex-1 max-w-[20rem] p-4 shadow-xl bg-gray-100 dark:bg-gray-900">
            <div className="mb-2 p-4">
                <ThemeSwitcher />
                <Typography variant="h5" className="text-center text-black dark:text-white">
                    Bienvenido
                </Typography>
            </div>
            <List>
                <Link to="/welcome" className="text-blue-gray-500">
                    <ListItem className="text-black dark:text-white">
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Inicio
                    </ListItem>
                </Link>
            </List>
            <CompaniesModule />
            <PositionsModule />
            <EmployeesModule handleOpen={handleOpen} open={open} />
        </Card>
    );
}