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
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const obtenerEmpresas = async () => {
        try {
            const { data } = await clienteAxios.get('/api/companies');
            setEmpresas(data.companies);
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

    const nuevaEmpresa= async() => {
        try {
            const { data } = await clienteAxios.post('/api/companies');
            setEmpresas([...empresas, data.company]);
        } catch (error) {
            console.log(error);
            setErrores(error);
        }
    }

    const editarEmpresa = async(id, nombre) => {
        // console.log(id);
        // console.log(formData);
        // const sendData = {
        //     name: formData
        // }
        // const formData = new FormData();
        // formData.append('name', nombre);
        // console.log(sendData);
        // console.log(nombre);
        try {
            const { data } = await clienteAxios.patch(`/api/companies/${id}`, { name: nombre },
            {
                headers: {
                    'X-XSRF-TOKEN': xsrf_token,
                    // 'content-type': 'application/json',
                    // 'Content-Type': `multipart/form-data`,
                    // 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            });
            console.log(data);
            obtenerEmpresas();
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
                obtenerPuestos,
                obtenerEmpresas,
                obtenerEmpleados,
                nuevaEmpresa,
                editarEmpresa,
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