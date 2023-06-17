/* eslint-disable no-undef */
import { useMemo, useState } from 'react';
import { TextField, Autocomplete, CircularProgress, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useElementRH from '../../hooks/useElemenRH';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const EmployeeForm = () => {

    const parametros  = useParams();

    const id = parseInt(parametros?.id) || null;

    const { empleados, puestos, empresas, nuevoEmpleado, editarEmpleado, errores } = useElementRH();

    const [openPuestos, setOpenPuestos] = useState(false);
    const [openEmpresas, setOpenEmpresas] = useState(false);
    const loadingPuestos = openPuestos && puestos.length === 0;
    const loadingEmpresas = openEmpresas && empresas.length === 0;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [puesto, setPuesto] = useState(null);
    const [empresa, setEmpresa] = useState(null);

    useMemo(() => {
        if(id !== null && empleados?.employees?.length > 0)
        {
            const empleado = empleados.employees.find(empleado => empleado.id === id);
            
            setFirstName(empleado.first_name);
            setLastName(empleado.last_name);
            setStartDate(empleado.start_date);
            setPuesto(empleado.position);
            setEmpresa(empleado.company);
        }

        if(id === null) {
            setFirstName('');
            setLastName('');
            setStartDate(dayjs().format('YYYY-MM-DD'));
            setPuesto(null);
            setEmpresa(null);
        }
    }, [id, empleados]);

    const submitHandler = async(event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('start_date', startDate);
        // formData.append('position', positionRef.current.value);
        formData.append('position_id', puesto?.id || '');
        // formData.append('company', companyRef.current.value);
        formData.append('company_id', empresa?.id || '');

        // console.log('ID: ', id);

        // for (const value of formData.values()) {
        //     console.log(value);
        // }

        if(id !== null) 
        {
            formData.append('_method', 'PUT');
            
            await editarEmpleado(id, formData).then(({message, employee}) => {
                if(employee) {
                    console.log(employee);
                }

                if(message) {
                    MUISwal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((error) => {
                if(error.response) {
                    MUISwal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error de validación',
                        text: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            
        }
        else 
        {
            formData.append('_method', 'POST');

            await nuevoEmpleado(formData).then(({message, employee}) => {
                if(employee) {
                    console.log(employee);
                }

                if(message) {
                    MUISwal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    setFirstName('');
                    setLastName('');
                    setStartDate(dayjs().format('YYYY-MM-DD'));
                    setPuesto(null);
                    setEmpresa(null);
                }
            }).catch((error) => {
                if(error.response) {
                    MUISwal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error de validación',
                        text: error.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });
            
        }
    }


    return (
        <>
            <div className='text-center mb-5'>
                <h1 className="font-sans font-bold text-3xl text-gray-700 dark:text-gray-50">
                    {id !== null ? 'Edición de empleado' : 'Crear Nuevo empleado'}
                </h1>
            </div>
            <form onSubmit={submitHandler}>
                <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                    <div className='col-span-1 lg:col-span-1'>
                        <TextField className='shadow-md w-full' variant="outlined"
                            label="Nombre(s)"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            error={errores?.first_name ? true : false}
                            helperText={errores?.first_name ? errores.first_name.map((error, key) => <span key={key}>{error}</span>) : null}
                        />
                    </div>
                    <div className='col-span-1 lg:col-span-1'>
                        <TextField className='shadow-md w-full' variant="outlined"
                            label="Apellidos"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            error={errores?.last_name ? true : false}
                            helperText={errores?.last_name ? errores.last_name.map((error, key) => <span key={key}>{error}</span>) : null}
                        />
                    </div>
                    <div className='col-span-1 lg:col-span-1'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker className='shadow-md w-full'
                                label="Fecha de inicio"
                                value={dayjs(startDate)}
                                format='YYYY-MM-DD'
                                slotProps={{
                                    textField: {
                                        error: errores?.start_date ? true : false,
                                        helperText: errores?.start_date ? errores.start_date.map((error, key) => <span key={key}>{error}</span>) : null,
                                    },
                                }}
                            />
                            
                        </LocalizationProvider>
                    </div>
                    <div className='col-span-1 lg:col-span-1'>
                        <Autocomplete className='shadow-md w-full'
                            open={openPuestos}
                            onOpen={() => {setOpenPuestos(true)}}
                            onClose={() => setOpenPuestos(false)}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            options={puestos}
                            loading={loadingPuestos}
                            // defaultValue={empleado?.position || ''}
                            value={puesto}
                            onChange={(event, value) => {
                                if(value === null) 
                                {
                                    setPuesto(null);
                                }
                                else
                                {
                                    setPuesto(value);
                                }
                            }}
                            // inputValue={empleado?.position?.name || ''}
                            // onInputChange={(event, value) => {
                            //     if(value === null) 
                            //     {
                            //         setPuesto(null);
                            //     }
                            //     else
                            //     {
                            //         setPuesto(value.id);
                            //     }
                            // }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Selecciona un puesto"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                        <>
                                            {loadingPuestos ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                        ),
                                    }}
                                    error={errores?.position_id ? true : false}
                                    helperText={errores?.position_id ? errores.position_id.map((error, key) => <span key={key}>{error}</span>) : null}
                                />
                            )}
                        />
                    </div>
                    <div className='col-span-1 lg:col-span-1'>
                        <Autocomplete className='shadow-md w-full'
                            open={openEmpresas}
                            onOpen={() => setOpenEmpresas(true)}
                            onClose={() => setOpenEmpresas(false)}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name || ''}
                            options={empresas}
                            loading={loadingEmpresas}
                            // defaultValue={empleado?.company || ''}
                            value={empresa}
                            onChange={(event, value) => {
                                if(value === null)
                                {
                                    setEmpresa(null);
                                }
                                else
                                {
                                    setEmpresa(value);
                                }
                            }}
                            // inputValue={empleado?.company?.name || ''}
                            // onInputChange={(event, value) => {
                            //     if(value === null)
                            //     {
                            //         setEmpresa(null);
                            //     }
                            //     else
                            //     {
                            //         setEmpresa(value.id);
                            //     }
                            // }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Selecciona una compañia"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                        <>
                                            {loadingEmpresas ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                        ),
                                    }}
                                    error={errores?.company_id ? true : false}
                                    helperText={errores?.company_id ? errores.company_id.map((error, key) => <span key={key}>{error}</span>) : null}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Button className='shadow-md w-full text-black dark:text-white'
                            type="submit"
                            variant="contained"
                        >
                            {id !== null ? 'Guardar edición del empleado' : 'Crear nuevo empleado'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EmployeeForm;
