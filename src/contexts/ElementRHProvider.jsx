import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery';
import clienteAxios from '../config/axios';

const ElementRHContext = createContext();

const ElementRHProvider = ({ children }) => {
    const [ theme, setTheme ] = useState(localStorage.getItem('theme') || null);
    const [ empleados, setEmpleados ] = useState(null);
    const [ puestos, setPuestos ] = useState(null);
    const [ empresas, setEmpresas ] = useState(null);
    const [ errores , setErrores ] = useState(null);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const xsrf_token = document.cookie  
        ? document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN')).split('=')[1] 
        : clienteAxios.get('/sanctum/csrf-cookie').then(response => response.data).catch(error => console.log(error))

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
            return data;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const obtenerEmpresas = async () => {
        try {
            const { data } = await clienteAxios.get('/api/companies');
            setEmpresas(data.companies);
            return data;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const obtenerEmpleados = async () => {
        try {
            const { data } = await clienteAxios.get('/api/employees');
            setEmpleados(data.employees);
            return data.employees;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    useMemo(() => {
        obtenerPuestos();
        obtenerEmpresas();
        obtenerEmpleados();
    }, []);

    const nuevoPuesto = async(formData) => {
        try {
            const { data } = await clienteAxios.post('/api/positions', formData,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(data);
            obtenerPuestos();
            setErrores(null);
            return data;
        } catch (error) {
            setErrores(error.response.data.errors);
            throw error;
        }
    }

    const editarPuesto = async(id, formData) => {
        try {
            const { data } = await clienteAxios.post(`/api/positions/${id}`, formData,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            });
            console.log(data);
            obtenerPuestos();
            setErrores(null);
            return data;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const eliminarPuesto = async(id) => {
        try {
            const { data } = await clienteAxios.delete(`/api/positions/${id}`);
            obtenerPuestos();
            setErrores(null);
            return data;
        }
        catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const nuevaEmpresa= async(formData) => {
        try {
            const { data } = await clienteAxios.post('/api/companies', formData,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(data);
            obtenerEmpresas();
            setErrores(null);
            return data;
        } catch (error) {
            setErrores(error.response.data.errors);
            throw error;
        }
    }

    const editarEmpresa = async(id, formData) => {
        try {
            const { data } = await clienteAxios.post(`/api/companies/${id}`, formData,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            });
            console.log(data);
            obtenerEmpresas();
            setErrores(null);
            return data;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const eliminarEmpresa = async(id) => {
        try {
            const { data } = await clienteAxios.delete(`/api/companies/${id}`);
            obtenerEmpresas();
            setErrores(null);
            return data;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const nuevoEmpleado = async(formData) => {
        try 
        {
            const { data } = await clienteAxios.post('/api/employees', formData,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            obtenerEmpleados();
            setErrores(null);
            return data;
        } 
        catch (error) 
        {
            setErrores(error.response.data.errors);
            throw error;
        }
    }

    const editarEmpleado = async(id, formData) => {
        try 
        {
            const { data } = await clienteAxios.post(`/api/employees/${id}`, formData,
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            obtenerEmpleados();
            setErrores(null);
            return data;
        } 
        catch (error) 
        {
            setErrores(error.response.data.errors);
            throw error;
        }
    }

    const eliminarEmpleado = async(id) => {
        try {
            const { data } = await clienteAxios.delete(`/api/employees/${id}`);
            obtenerEmpleados();
            setErrores(null);
            return data;
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }


    return (
        <ElementRHContext.Provider 
            value={{ 
                //values
                theme, 
                setTheme,

                puestos,
                empresas,
                empleados,

                errores,
                setErrores,

                //functions
                nuevoPuesto,
                editarPuesto,
                eliminarPuesto,

                obtenerPuestos,
                obtenerEmpresas,
                obtenerEmpleados,

                nuevaEmpresa,
                editarEmpresa,
                eliminarEmpresa,

                nuevoEmpleado,
                editarEmpleado,
                eliminarEmpleado
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