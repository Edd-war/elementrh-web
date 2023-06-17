import { useEffect } from "react";
import useElementRH from "../hooks/useElemenRH";


export default function ThemeSwitcher() {

    const { theme, setTheme } = useElementRH();

    useEffect(() => {
        if(theme === 'dark')
        {
            document.querySelector('html').classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        else
        {
            document.querySelector('html').classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);


    const handleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="flex items-center justify-end">
            <label htmlFor="theme" className="mr-2 text-black dark:text-white">
                Tema
            </label>
            <button className="rounded-lg p-1 bg-black dark:bg-white text-white dark:text-black"
                type="button"
                id="theme"
                name="theme" 
                onClick={handleTheme}
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </button>
        </div>
    )
}

