import React, {useState} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
// Altura estimada por fila en px (ajusta según tu diseño)
const ROW_HEIGHT = 40;
const HEADER_HEIGHT = 50;
const PADDING = 50;

const columnDefs = [
  { headerName: "ID", field: "id", sortable: true, filter: true },
  {
    headerName: "Tipo Alerta",
    field: "tipo_alerta",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Fecha",
    field: "fecha",
    sortable: true,
    filter: true,
    valueFormatter: (params) => {
      if (!params.value) return "";
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  { headerName: "Hora", field: "hora", sortable: true, filter: true },
  { headerName: "IP", field: "ip", sortable: true, filter: true },
  { headerName: "País", field: "codigo_pais", sortable: true, filter: true },
  { headerName: "Requests", field: "requests", sortable: true, filter: true },
  { headerName: "Intentos", field: "intentos", sortable: true, filter: true },
  { headerName: "Ratio", field: "ratio", sortable: true, filter: true },
  { headerName: "AS Owner", field: "as_owner", sortable: true, filter: true },
  { headerName: "ISP", field: "isp", sortable: true, filter: true },
  { headerName: "VPN", field: "vpn", sortable: true, filter: true },
  { headerName: "Score", field: "score_final", sortable: true, filter: true },
  { headerName: "Riesgo", field: "riesgo", sortable: true, filter: true },
];

function AlertGraph({ rowData }) {
  const [pageSize, setPageSize] = useState(10);
  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 120,
  };

    // Calculamos altura dinámica
  const dynamicHeight = HEADER_HEIGHT + PADDING + pageSize * ROW_HEIGHT;

  return (
    <section className="alert-graph">
      <article
  className="ag-theme-alpine custom-table"
  style={{ width: "100%", height: `${dynamicHeight}px` }}
>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          onPaginationChanged={(params) => {
            setPageSize(params.api.paginationGetPageSize());
          }}
        />
      </article>
    </section>
  );
}

export default AlertGraph;
