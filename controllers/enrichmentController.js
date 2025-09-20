import { getFileReport } from '../services/virusTotalService.js';

export const enrichFile = async (req, res) => {
  const { hash } = req.params;
  try {
    const report = await getFileReport(hash);

    if (!report?.data?.attributes) {
      return res.status(404).json({ error: 'Archivo no encontrado o respuesta inválida de VirusTotal' });
    }

    const enrichedData = {
      hash,
      file_name: report.data.attributes.names?.[0],
      type: report.data.attributes.type_description,
      reputation: report.data.attributes.reputation,
      malicious: report.data.attributes.last_analysis_stats.malicious,
      undetected: report.data.attributes.last_analysis_stats.undetected,
    };

    res.status(200).json(enrichedData);
  } catch (error) {
    console.error('Error en enrichFile:', error);
    res.status(500).json({ error: 'Error al consultar VirusTotal' });
  }
};
