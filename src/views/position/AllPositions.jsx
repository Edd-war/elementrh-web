/* eslint-disable no-undef */
import useElementRH from "../../hooks/useElemenRH";
// import EditCompanies from "./EditCompanies";

import { DataGrid } from '@mui/x-data-grid';


const AllPositions = () => {
    const { puestos, nuevoPuesto, editarPuesto, eliminarPuesto } = useElementRH();

    const handleNewPositions = () => {
        MUISwal.fire({
            title: 'Nuevo puesto',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Crear',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {
                if (!name)
                {
                    MUISwal.showValidationMessage('El nombre es obligatorio');
                }
                return { name };
            }
        }).then((result) => {
            if (result.isConfirmed)
            {
                const formData = new FormData();
                formData.append('name', result.value.name);

                formData.append('_method', 'POST');

                nuevoPuesto(formData).then(({message, position}) => {
                    if(position)
                    {
                        console.log(position);
                    }

                    if (message) {
                        MUISwal.fire({
                            icon: 'success',
                            title: 'Posición creada corectamente',
                            text: message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                    if(error.response)
                    {
                        MUISwal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: error.response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
        });
    }

    const handleEditPositions = (position) => {
        MUISwal.fire({
            title: 'Editar Posición',
            input: 'text',
            inputValue: position.name,
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = MUISwal.getInput().value;
                if (!name) 
                {
                    MUISwal.showValidationMessage('El nombre es obligatorio');
                }
                return { name };
            }
        }).then((result) => {
            if (result.isConfirmed) 
            {
                const formData = new FormData();
                formData.append('name', result.value.name);

                formData.append('_method', 'PUT');

                editarPuesto(position.id, formData).then(({message, position}) => {
                    if(position)
                    {
                        console.log(position);
                    }

                    if (message) {
                        MUISwal.fire({
                            icon: 'success',
                            title: 'Posición Actualizada corectamente',
                            text: message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                    if(error.response)
                    {
                        MUISwal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: error.response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
        });
    }

    const handleDeletePositions = (position) => {
        MUISwal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return eliminarPuesto(position.id);
            },
            allowOutsideClick: () => !MUISwal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.message) {
                    MUISwal.fire({
                        icon: 'success',
                        title: 'Posición eliminada corectamente',
                        text: result.value.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }).catch((error) => {
            console.log(error);
            if(error.response)
            {
                MUISwal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    
    const actionsButtons = (rowProps) => {
        return (
            <div className='flex justify-around'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleEditPositions(rowProps.row)}
                >
                    Editar
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleDeletePositions(rowProps.row)}
                >
                    Eliminar
                </button>
            </div>
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'actions', headerName: 'Acciones', width: 200, renderCell: (rowProps) => actionsButtons(rowProps) },
    ];

    return (
        <>
            <div className='text-center mb-5'>
                <h1 className="font-sans font-bold text-3xl text-gray-700 dark:text-gray-50">
                    Todas las posiciones
                </h1>
            </div>
            <div className='flex justify-end mb-5'>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleNewPositions()}
                >
                    Nueva Posición
                </button>
            </div>
            <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                    rows={puestos?.length > 0 ? puestos : []}
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

export default AllPositions