import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

// Cambia la URL si tu endpoint es diferente
const API_URL = "http://localhost:3000/alert";

const columnDefs = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  {
    headerName: "Fecha",
    field: "fecha",
    sortable: true,
    filter: true,
    valueFormatter: params => {
      if (!params.value) return "";
      const date = new Date(params.value);
      return date.toLocaleDateString();
    }
  },
  { headerName: "Usuario", field: "usuario", sortable: true, filter: true },
  { headerName: "IP", field: "ip", sortable: true, filter: true },
  { headerName: "Hora", field: "hora", sortable: true, filter: true },
  { headerName: "País", field: "pais", sortable: true, filter: true },
  { headerName: "Intentos", field: "intentos", sortable: true, filter: true },
];

function AlertGraph() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setRowData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
      />
    </div>
  );
}

export default AlertGraph;