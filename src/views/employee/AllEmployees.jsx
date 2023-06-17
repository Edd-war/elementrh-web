/* eslint-disable no-undef */
import { Link } from "react-router-dom";
import useElementRH from "../../hooks/useElemenRH";

import { DataGrid } from '@mui/x-data-grid';


const AllEmployees = () => {
    const { empleados, eliminarEmpleado } = useElementRH();

    const handleEliminarEmpleado = async(id) => {
        
        MUISwal.fire({
            title: '¿Estás seguro?',
            text: "Un empleado eliminado no puede ser recuperado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) 
            {
                eliminarEmpleado(id).then(({message}) => {
                    console.log(message);
                    MUISwal.fire(
                        'Eliminado',
                        message,
                        'success'
                    )
                }).catch((error) => {
                    console.log(error);
                    MUISwal.fire(
                        'Error',
                        'Hubo un error al eliminar el empleado',
                        'error'
                    )
                })
            }
        })
    }

    const actionsButtons = (rowProps) => {
        return (
            <div className='flex justify-around'>
                <Link to={`/empleados/edición/${rowProps.row.id}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Editar
                    </button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleEliminarEmpleado(rowProps.row.id)}
                >
                    Eliminar
                </button>
            </div>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 85 },
        { field: 'first_name', headerName: 'Nombre', width: 100 },
        { field: 'last_name', headerName: 'Apellido', width: 150 },
        { field: 'start_date', headerName: 'Fecha de Inicio', width: 170 },
        { field: 'position', headerName: 'Posición', width: 130, renderCell: (rowProps) => rowProps.row.position.name },
        { field: 'company', headerName: 'Compañía', width: 140, renderCell: (rowProps) => rowProps.row.company.name },
        { field: 'actions', headerName: 'Acciones', width: 200, renderCell: (rowProps) => actionsButtons(rowProps) },
    ];

    return (
        <>
            <div className='text-center mb-5'>
                <h1 className="font-sans font-bold text-3xl text-gray-700 dark:text-gray-50">
                    Todos los Empleados
                </h1>
            </div>
            <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                    rows={empleados?.employees?.length > 0 ? empleados.employees : []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default AllEmployees