const queries = {
      // USERS
  getUserById: `SELECT * FROM clientes WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM clientes WHERE email=$1;`,
  createUser: `INSERT INTO clientes (nombre, cif, email, password)
            VALUES ($1,$2,$3,$4);`,

    getAllAlerts: `
SELECT 
  a.fecha,
  COALESCE(a.ip, 'Desconocido') AS ip,
  e.descripcion AS estado_desc,
  t.codigo      AS tipo_codigo,
  t.descripcion AS tipo_desc,
    COALESCE(a.riesgo, 'Desconocido') as riesgo,
  a.score as score_final
FROM (
  -- DDOS
  SELECT
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
ORDER BY a.fecha DESC NULLS LAST;

`,

  // USERS
  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (name, email, hashed_password) VALUES ($1,$2,$3);`,

  // Alertas
  getAlertLogin: `SELECT 
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