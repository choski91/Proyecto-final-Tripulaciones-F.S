const queries = {
  // USERS
  getUserById: `SELECT * FROM clientes WHERE id_cliente=$1;`,
  getUserByEmail: `SELECT id_cliente, nombre, email, password, cif FROM clientes WHERE email = $1;`,

  createUser: `INSERT INTO clientes (nombre, cif, email, password) 
               VALUES ($1, $2, $3, $4) 
               RETURNING id_cliente, nombre, email, cif;`,

    getAllAlerts: `
SELECT 
  a.id,
  a.fecha,
  COALESCE(a.ip, 'Desconocido') AS ip,
  e.descripcion AS estado_desc,
  t.codigo      AS tipo_codigo,
  t.descripcion AS tipo_desc,
  COALESCE(a.riesgo, 'Desconocido') AS riesgo,
  COALESCE(a.score::text, 'N/A') AS score_final
FROM (
  -- DDOS
  SELECT
    id,
    fecha,
    ip,
    riesgo,
    score_final AS score,
    id_status,
    id_tipo
  FROM public.alertas_ddos

  UNION ALL

  -- DOS
  SELECT
    id,
    fecha,
    ip,
    riesgo,
    score_final AS score,
    id_status,
    id_tipo
  FROM public.alertas_dos

  UNION ALL

  -- Fuerza bruta
  SELECT
    id,
    fecha,
    ip,
    riesgo,
    score_final AS score,
    id_status,
    id_tipo
  FROM public.alertas_fuerza_bruta

  UNION ALL

  -- Login sospechoso
  SELECT
    id,
    fecha,
    ip,
    score_abuse::text AS riesgo,
    score_vt::numeric AS score,
    id_status,
    id_tipo
  FROM public.alertas_login_sospechoso

  UNION ALL

  -- Phishing
  SELECT
    id,
    fecha,
    NULL::text AS ip,
    risk_level AS riesgo,
    score_final AS score,
    id_status,
    id_tipo
  FROM public.alertas_phishing
) a
INNER JOIN estado_alerta e ON e.id_status = a.id_status
INNER JOIN tipos_ataques t ON t.id_tipo = a.id_tipo
ORDER BY a.id DESC;
`,

  // Alertas
  getAlertLogin: `SELECT 
    a.id,
    a.fecha,
    a.ip,
    e.descripcion    AS estado_desc,
    t.codigo         AS tipo_codigo,
    t.descripcion    AS tipo_desc,
	a.riesgo    AS riesgo,
	a.score_final    AS score_final
FROM public.alertas_login_sospechoso a
INNER JOIN estado_alerta e ON e.id_status = a.id_status
INNER JOIN tipos_ataques t ON t.id_tipo = a.id_tipo;`,
  getAlertPhishing: `SELECT 
    p.id,
    p.fecha,
    p.ip,
    e.descripcion    AS estado_desc,
    t.codigo         AS tipo_codigo,
    t.descripcion    AS tipo_desc,
	p.riesgo    AS riesgo,
	p.score_final    AS score_final
FROM public.alertas_phishing p
INNER JOIN estado_alerta e ON e.id_status = p.id_status
INNER JOIN tipos_ataques t ON t.id_tipo = p.id_tipo;`,
  getAlertDdos: `SELECT 
    d.id,
    d.fecha,
    d.ip,
    e.descripcion    AS estado_desc,
    t.codigo         AS tipo_codigo,
    t.descripcion    AS tipo_desc,
	d.riesgo    AS riesgo,
	d.score_final    AS score_final
FROM public.alertas_ddos d
INNER JOIN estado_alerta e ON e.id_status = d.id_status
INNER JOIN tipos_ataques t ON t.id_tipo = d.id_tipo;`,
  getAlertDos: `SELECT 
    d.id,
    d.fecha,
    d.ip,
    e.descripcion    AS estado_desc,
    t.codigo         AS tipo_codigo,
    t.descripcion    AS tipo_desc,
	d.riesgo    AS riesgo,
	d.score_final    AS score_final
FROM public.alertas_dos d
INNER JOIN estado_alerta e ON e.id_status = d.id_status
INNER JOIN tipos_ataques t ON t.id_tipo = d.id_tipo;`,
  getAlertFuerzaBruta: `SELECT 
    f.id,
    f.fecha,
    f.ip,
    e.descripcion    AS estado_desc,
    t.codigo         AS tipo_codigo,
    t.descripcion    AS tipo_desc,
	f.riesgo    AS riesgo,
	f.score_final    AS score_final
FROM public.alertas_fuerza_bruta f
INNER JOIN estado_alerta e ON e.id_status = f.id_status
INNER JOIN tipos_ataques t ON t.id_tipo = f.id_tipo;`,
};


module.exports = queries;