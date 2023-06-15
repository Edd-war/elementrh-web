import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./partials/SideBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useElementRH from "../hooks/useElemenRH";



export default function Layout() {

    const { theme } = useElementRH();

    const themeConfig = useMemo(() => (
        createTheme({
            palette: {
                mode: theme,
            },
        })
    ), [theme]);

    return (
        <ThemeProvider theme={themeConfig}>
            <CssBaseline />
            <div className="flex p-5 gap-5 content-start h-screen w-full bg-gray-300 dark:bg-gray-800">
                <SideBar />

                <main className="flex-1 overflow-y-auto rounded-xl p-10 shadow-xl bg-gray-100 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </ThemeProvider>
    )
}