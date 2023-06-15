import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery';
import clienteAxios from '../config/axios';

const ElementRHContext = createContext();

const ElementRHProvider = ({ children }) => {
    const [ theme, setTheme ] = useState(localStorage.getItem('theme') || null);
    const [ puestos, setPuestos ] = useState([]);
    const [ empresas, setEmpresas ] = useState([]);


    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useMemo(() => {
        if(localStorage.getItem('theme') === null)
        {
            if(prefersDarkMode)
            {
                console.log("Seré oscuro")
                setTheme('dark');
            }
            else
            {
                console.log("Seré claro")
                setTheme('light');
            }
        }
    }, [prefersDarkMode]);

    const obtenerPuestos = async () => {
        try {
            const { data } = await clienteAxios.get('/api/positions');
            setPuestos(data.positions);
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerEmpresas = async () => {
        try {
            const { data } = await clienteAxios.get('/api/companies');
            setEmpresas(data.companies);
        } catch (error) {
            console.log(error);
        }
    }

    useMemo(() => {
        obtenerPuestos();
        obtenerEmpresas();
    }, []);


    return (
        <ElementRHContext.Provider 
            value={{ 
                theme, 
                setTheme,
                puestos,
                obtenerPuestos,
                empresas,
                obtenerEmpresas
            }}
        >
            {children}
        </ElementRHContext.Provider>
    )
}

ElementRHProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export 
{ 
    ElementRHProvider 
}

export default ElementRHContext;