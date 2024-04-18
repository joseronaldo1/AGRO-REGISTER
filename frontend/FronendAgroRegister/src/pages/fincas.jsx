
<<<<<<< HEAD
function Finca() {
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [showActualizacionModal, setShowActualizacionModal] = useState(false);
  const [registroFormData, setRegistroFormData] = useState({
    nombre_variedad: "",
    nombre_actividad: "",
    tipo_recurso: "",
    tiempo: "",
  });
  const [actualizacionFormData, setActualizacionFormData] = useState({
    nombre_variedad: "",
    nombre_actividad: "",
    tipo_recurso: "",
    tiempo: "",
  });

  const handleOpenRegistroModal = () => {
    setShowRegistroModal(true);
  };

  const handleCloseRegistroModal = () => {
    setShowRegistroModal(false);
  };

  const handleOpenActualizacionModal = () => {
    setShowActualizacionModal(true);
  };

  const handleCloseActualizacionModal = () => {
    setShowActualizacionModal(false);
  };

  const handleRegistroFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de registro:", registroFormData);
    setRegistroFormData({
      nombre_finca: "",
      direccion: "",
      longitud: "",
      latitud: "",
    });
    handleCloseRegistroModal();
  };

  const handleActualizacionFormSubmit = (event) => {
    event.preventDefault();
    console.log("Datos de actualización:", actualizacionFormData);
    setActualizacionFormData({
      nombre_finca: "",
      direccion: "",
      longitud: "",
      latitud: "",
    });
    handleCloseActualizacionModal();
  };

  const camposRegistro = [
    { name: "nombre_finca", placeholder: "Nombre de la finca", type: "text" },
    { name: "direccion", placeholder: "Dirección", type: "text" },
    { name: "longitud", placeholder: "Longitud", type: "text" },
    { name: "latitud", placeholder: "Latitud", type: "text" }
  ];

  const camposActualizacion = [
    { name: "nombre_finca", placeholder: "Nombre de la finca", type: "text" },
    { name: "direccion", placeholder: "Dirección", type: "text" },
    { name: "longitud", placeholder: "Longitud", type: "text" },
    { name: "latitud", placeholder: "Latitud", type: "text" }
  ];

  const columns = [
    {
      name: "Nombre finca",
      selector: (row) => row.Nombrefinca,
      sortable: true,
    },
    {
      name: "Direccion",
      selector: (row) => row.Direccion,
      sortable: true,
    },
    {
      name: "Longitud",
      selector: (row) => row.Longitud,
      sortable: true,
    },
    {
      name: "Latitud",
      selector: (row) => row.Latitud,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          className="btn btn-warning p-2 rounded-lg text-sm font-bold"
          type="button"
          onClick={() => handleOpenActualizacionModal()}
        >
          Editar
        </button>
      ),
    },
  ];

  const data = [
    {
      Nombrefinca: "Yamboro",
      Direccion: "Pitalito Huila",
      Longitud: 1346,
      Latitud: 394435,
    },
    {
      Nombrefinca: "Margaritas",
      Direccion: "Pitalito Huila",
      Longitud: 1202,
      Latitud: 434438,
    },
  ];

  return (
    <div style={{ marginTop: "8%" }}>
      
      <Header />
      <div className="container mt-5">
        <Botones
          children="Registrar"
          onClick={() => handleOpenRegistroModal()}
        />
        <Datatable columns={columns} data={data} title="Fincas" />
      </div>

      {/* Modal de Registro */}
      <ModalRecuRegeContrasenia
        mostrar={showRegistroModal}
        cerrarModal={handleCloseRegistroModal}
        titulo="Registro"
      >
        <Formulario
          campos={camposRegistro}
          onSubmit={handleRegistroFormSubmit}
          className="form-registro"
        />
        <Botones
          children="Registrar"
          onClick={() => handleRegistroFormSubmit()}
        />
      </ModalRecuRegeContrasenia>

      {/* Modal de Actualización */}
      <ModalRecuRegeContrasenia
        mostrar={showActualizacionModal}
        cerrarModal={handleCloseActualizacionModal}
        titulo="Actualización"
      >
        <Formulario
          campos={camposActualizacion}
          onSubmit={handleActualizacionFormSubmit}
          className="form-actualizacion"
        />
          <Botones
          children="Registrar"
          onClick={() => handleRegistroFormSubmit()}
        />
      </ModalRecuRegeContrasenia>
    </div>
  );
}

export default Finca;

import { default as Finca } from "../components/templates/Fincas";
export const FincaPage = () => {
  return (<Finca/>);
}

