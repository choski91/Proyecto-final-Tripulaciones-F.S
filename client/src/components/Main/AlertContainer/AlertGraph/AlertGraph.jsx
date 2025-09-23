import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const getColumnDefs = (attackType) => {
  switch (attackType) {
    case "phishing":
      return [
        { headerName: "ID", field: "id", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "Usuario", field: "usuario", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "IP", field: "ip", sortable: true, filter: true },
        { headerName: "País", field: "pais", sortable: true, filter: true },
      ];
    case "ddos":
    case "dos":
      return [
        { headerName: "ID", field: "id", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "IP", field: "ip", sortable: true, filter: true },
        { headerName: "País", field: "pais", sortable: true, filter: true },
        { headerName: "Intentos", field: "intentos", sortable: true, filter: true },
      ];
    case "fuerzabruta":
      return [
        { headerName: "ID", field: "id", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "Usuario", field: "usuario", sortable: true, filter: true },
        { headerName: "IP", field: "ip", sortable: true, filter: true },
        { headerName: "Intentos", field: "intentos", sortable: true, filter: true },
      ];
    default: // login sospechoso y otros
      return [
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
  }
};

function AlertGraph({ rowData, attackType }) {
  const columnDefs = getColumnDefs(attackType);

  return (
    <section className="alert-graph">
      <article className="ag-theme-alpine custom-table">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </article>
    </section>
  );
}

export default AlertGraph;