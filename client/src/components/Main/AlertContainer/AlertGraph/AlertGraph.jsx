import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

// Altura estimada por fila en px (ajusta según tu diseño)
const ROW_HEIGHT = 40;
const HEADER_HEIGHT = 50;
const PADDING = 50;

// Estilos del botón "pill" con degradado azul similar al ejemplo
const BTN_STYLES = `
  .btn-report {
    appearance: none;
    border: 0;
    border-radius: 9999px;
    padding: 10px 18px;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(90deg, #0b76c5 0%, #55b6ea 100%);
    box-shadow: 0 6px 16px rgba(11, 118, 197, 0.35);
    transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease, opacity 120ms ease;
    white-space: nowrap;
  }
  .btn-report:hover:not(:disabled) {
    transform: translateY(-1px);
    filter: brightness(1.03);
    box-shadow: 0 10px 22px rgba(11, 118, 197, 0.45);
    cursor: pointer;
  }
  .btn-report:active:not(:disabled) {
    transform: translateY(0);
    filter: brightness(0.98);
    box-shadow: 0 4px 10px rgba(11, 118, 197, 0.35);
  }
  .btn-report:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: 0 4px 10px rgba(11, 118, 197, 0.25);
  }
`;

const formatFechaLocal = (v) => {
  if (!v) return "";
  const d = new Date(v);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
};

/**
 * Renderizador de celda para el botón de descarga de informe (PDF)
 * - Toma el ID de la alerta desde props.data[idField] (por defecto: "alert_id").
 * - Toma el valor de "attack" desde props.data[attackField] (por defecto: "tipo_codigo").
 * - Mantiene fallback opcional a prop `attack` o a un <select id="attackSelectId"> por compatibilidad.
 */
const DownloadButtonRenderer = (props) => {
  const [downloading, setDownloading] = useState(false);

  // Params configurables
  const idField =
    props?.colDef?.cellRendererParams?.idField ||
    props?.idField ||
    "alert_id";
  const attackField =
    props?.colDef?.cellRendererParams?.attackField ||
    props?.attackField ||
    "tipo_codigo";
  const attackFromProp = props?.colDef?.cellRendererParams?.attack;
  const attackSelectId =
    props?.colDef?.cellRendererParams?.attackSelectId || "attackSelect";

  // Localiza el ID de la alerta de forma flexible
  const alertId =
    (props.data && (props.data[idField] ?? props.data.id ?? props.data.alert_id)) ??
    null;

  // Valor de attack preferente: campo de la fila (p. ej., "tipo_codigo")
  const attackFromRow =
    (props.data && (props.data[attackField] ?? props.data.tipo_codigo)) ?? "";

  const resolveAttack = () => {
    if (attackFromRow) return attackFromRow;
    if (attackFromProp != null && attackFromProp !== "") return attackFromProp;
    // Fallback: intenta leer un <select id="attackSelectId">
    if (typeof document !== "undefined" && attackSelectId) {
      const el = document.getElementById(attackSelectId);
      if (el && "value" in el) return el.value;
    }
    return "";
  };

  const handleDownload = async () => {
    if (!alertId) {
      alert("ID de alerta no disponible para esta fila.");
      return;
    }
    const attack = resolveAttack();
    if (!attack) {
      alert("El tipo (attack) no está disponible en esta fila.");
      return;
    }
    try {
      setDownloading(true);
      const url = `https://desafio-4w98.onrender.com/api/report_by_id?attack=${encodeURIComponent(
        attack
      )}&alert_id=${encodeURIComponent(alertId)}`;
      const resp = await fetch(url, { method: "GET" });
      if (!resp.ok) {
        const txt = await resp.text();
        alert("Error al generar informe: " + txt);
        return;
      }
      const blob = await resp.blob();
      // Intenta deducir el nombre de archivo de las cabeceras
      let fileName =
        resp.headers.get("X-Report-Filename") ||
        (() => {
          const cd = resp.headers.get("Content-Disposition") || "";
          const m1 = cd.match(/filename\*=UTF-8''([^;]+)/);
          if (m1 && m1[1]) return decodeURIComponent(m1[1]);
          const m2 = cd.match(/filename="?([^"]+)"?/);
          if (m2 && m2[1]) return m2[1];
          return null;
        })();
      if (!fileName) fileName = `informe_${attack}_${alertId}.pdf`;

      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (err) {
      console.error(err);
      alert("Error descargando informe: " + err);
    } finally {
      setDownloading(false);
    }
  };

  const currentAttack = resolveAttack();

  return (
    <button
      type="button"
      className="btn-report"
      data-id={alertId || ""}
      data-attack={currentAttack || ""}
      onClick={handleDownload}
      disabled={!alertId || downloading}
      title={!alertId ? "ID de alerta no disponible" : "Descargar informe PDF"}
      aria-label="Descargar informe PDF"
    >
      {downloading ? "Descargando..." : "Descargar"}
    </button>
  );
};

function AlertGraph({
  rowData,
  /**
   * Campo del objeto de fila que contiene el ID de la alerta.
   * Por defecto: "alert_id". Si tus datos usan otro (p.ej. "id"), pásalo aquí.
   */
  idField = "alert_id",
  /**
   * Campo del objeto de fila que contiene el tipo/attack.
   * Por defecto: "tipo_codigo".
   */
  attackField = "tipo_codigo",
  /**
   * (Opcional) Fallback: valor del ataque si no estuviera en la fila.
   */
  attack,
  /**
   * (Opcional) Fallback: Id del <select> de donde obtener el ataque cuando no se pase por fila ni por prop.
   * Por defecto: "attackSelect".
   */
  attackSelectId = "attackSelect",
}) {
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

  // Columnas de la tabla, incluyendo la nueva columna "Informe"
  const columnDefs = useMemo(() => {
    return [
      { headerName: "Descripcion", field: "tipo_desc", sortable: true, filter: true },
      { headerName: "Tipo", field: "tipo_codigo", sortable: true, filter: true },
      { headerName: "IP", field: "ip", sortable: true, filter: true },
      { headerName: "Estado", field: "estado_desc", sortable: true, filter: true },
      { headerName: "Riesgo", field: "riesgo", sortable: true, filter: true },
      { headerName: "Score", field: "score_final", sortable: true, filter: true },
      {
        headerName: "Fecha",
        field: "fecha",
        sortable: true,
        filter: true,
        valueFormatter: (p) => formatFechaLocal(p.value),
      },
      {
        headerName: "Informe",
        field: "__actions",
        sortable: false,
        filter: false,
        minWidth: 170,
        maxWidth: 220,
        cellRenderer: DownloadButtonRenderer,
        cellRendererParams: {
          idField,
          attackField,
          attack,
          attackSelectId,
        },
      },
    ];
  }, [idField, attackField, attack, attackSelectId]);

  return (
    <section className="alert-graph">
      {/* Inyección de estilos locales del botón */}
      <style dangerouslySetInnerHTML={{ __html: BTN_STYLES }} />
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
