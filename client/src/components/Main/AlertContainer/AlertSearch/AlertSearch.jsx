import React from "react";
import * as XLSX from "xlsx";

const AlertSearch = ({ attackType, setAttackType, tableData }) => {
  // tableData debe ser un array de objetos (los datos de la tabla)

  const handleExportCSV = () => {
    if (!tableData || tableData.length === 0) return;
    // Convierte los datos a una hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    // Genera y descarga el archivo CSV
    XLSX.writeFile(workbook, "alertas.csv", { bookType: "csv" });
  };

  return (
    <div className="alert-search">
      <label htmlFor="attackType">Tipo de ataque:</label>
      <select
        id="attackType"
        value={attackType}
        onChange={e => setAttackType(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="ddos">DDoS</option>
        <option value="dos">DoS</option>
        <option value="fuerzabruta">Fuerza Bruta</option>
        <option value="login">Login Sospechoso</option>
        <option value="phishing">Phishing</option>
      </select>
      <button
        type="button"
        className="export-csv-btn"
        style={{ marginLeft: "1rem" }}
        onClick={handleExportCSV}
      >
        Exportar CSV
      </button>
    </div>
  );
};

export default AlertSearch;
