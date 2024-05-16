import React from 'react';
import DataTable from 'react-data-table-component';

export const Datatable = (props) => {
    const paginaOpciones = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsText: 'Todos'
    };

    const customStyles = {
        headCells: {
            style: {
                fontSize: '15px', // Tamaño de la fuente para los encabezados de columna
                fontWeight: 'bold', // Peso de la fuente para los encabezados de columna
                borderBottom: '1px solid #dee2e6', // Agrega un borde inferior a los encabezados de columna
            },
        },
        cells: {
            style: {
                fontSize: '15px', // Tamaño de la fuente para las celdas de datos
                lineHeight: '24px', // Espaciado entre líneas para las celdas de datos
                borderBottom: '1px solid #dee2e6', // Agrega un borde inferior a las celdas de datos
            },
        },
    };

    const containerStyles = {
        boxShadow: '0 4px 8px rgba(0, 0, 0)', // Sombra para simular que la tabla está flotando
        border: '1px solid #dee2e6', // Borde alrededor del contenedor
        borderRadius: '5px', // Borde redondeado del contenedor
        marginBottom: '20px', // Margen inferior para separar de otros elementos
    };

    const tableStyles = {
        overflow: 'auto', // Añade scroll horizontal y vertical
        borderCollapse: 'collapse', // Fusiona los bordes de las celdas de la tabla
        width: '100%', // Ancho completo de la tabla
    };

    return (
        <div style={containerStyles}>
            <h2 style={{ marginLeft: '15px', textAlign: 'center' }}>{props.title}</h2>
            <div style={tableStyles}>
                <DataTable
                    columns={props.columns}
                    data={props.data}
                    fixedHeader
                    pagination
                    paginationComponentOptions={paginaOpciones}
                    highlightOnHover
                    pointerOnHover
                    customStyles={customStyles} // Aplica los estilos personalizados
                />
            </div>
        </div>
    );
};
