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
  { headerName: "Descripcion", field: "tipo_desc", sortable: true, filter: true },
  { headerName: "Tipo", field: "tipo_codigo", sortable: true, filter: true },
  { headerName: "IP", field: "ip", sortable: true, filter: true },
  { headerName: "Estado", field: "estado_desc", sortable: true, filter: true },
  { headerName: "Riesgo", field: "riesgo", sortable: true, filter: true },
  { headerName: "Score", field: "score_final", sortable: true, filter: true },
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
