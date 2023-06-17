/* eslint-disable no-undef */
import useElementRH from "../../hooks/useElemenRH";
// import EditCompanies from "./EditCompanies";

import { DataGrid } from '@mui/x-data-grid';


const AllCompanies = () => {
    const { empresas, nuevaEmpresa, editarEmpresa, eliminarEmpresa } = useElementRH();

    const handleNewCompanies = () => {
        MUISwal.fire({
            title: 'Nueva Compañía',
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

                nuevaEmpresa(formData).then(({message, company}) => {
                    if(company)
                    {
                        console.log(company);
                    }

                    if (message) {
                        MUISwal.fire({
                            icon: 'success',
                            title: 'Compañía creada corectamente',
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

    const handleEditCompanies = (company) => {
        MUISwal.fire({
            title: 'Editar Compañía',
            input: 'text',
            inputValue: company.name,
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

                editarEmpresa(company.id, formData).then(({message, company}) => {
                    if(company)
                    {
                        console.log(company);
                    }

                    if (message) {
                        MUISwal.fire({
                            icon: 'success',
                            title: 'Compañía Actualizada corectamente',
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

    const handleDeleteCompanies = (company) => {
        MUISwal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return eliminarEmpresa(company.id);
            },
            allowOutsideClick: () => !MUISwal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.message) {
                    MUISwal.fire({
                        icon: 'success',
                        title: 'Compañía eliminada corectamente',
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
                    onClick={() => handleEditCompanies(rowProps.row)}
                >
                    Editar
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleDeleteCompanies(rowProps.row)}
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
                    Todas las Compañías
                </h1>
            </div>
            <div className='flex justify-end mb-5'>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => handleNewCompanies()}
                >
                    Nueva Compañía
                </button>
            </div>
            <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                    rows={empresas?.length > 0 ? empresas : []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default AllCompanies