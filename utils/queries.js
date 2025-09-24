const queries = {
      // USERS
  getUserById: `SELECT * FROM clientes WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM clientes WHERE email=$1;`,
  createUser: `INSERT INTO clientes (nombre, cif, email, password)
            VALUES ($1,$2,$3,$4);`,

    //Alert
    getAlertLogin: `SELECT * FROM alertas_login_sospechoso;`,

    //PHISHING
    getAlertPhishing: `SELECT * FROM alertas_phishing;`,

    getAllAlerts: `SELECT *
FROM (
  -- DDOS
  SELECT
    id,
    id_cliente,
    id_tipo,
    fecha,
    hora,
    ip,
    codigo_pais::text AS codigo_pais,
    sources    AS requests,      
    NULL::integer AS intentos,   
    ratio::numeric,
    as_owner,
    isp,
    vpn,
    score_final,
    riesgo,
    'ddos' AS tipo_alerta,
    to_jsonb(alertas_ddos.*) - ARRAY['id','id_cliente','id_tipo','fecha','hora','ip','codigo_pais','sources','ratio','as_owner','isp','vpn','score_final','riesgo'] AS extra
  FROM public.alertas_ddos

  UNION ALL

  -- DOS
  SELECT
    id,
    id_cliente,
    id_tipo,
    fecha,
    hora,
    ip,
    codigo_pais::text AS codigo_pais,
    requests    AS requests,     
    NULL::integer AS intentos,
    ratio::numeric,
    as_owner,
    isp,
    vpn,
    score_final,
    riesgo,
    'dos' AS tipo_alerta,
    to_jsonb(alertas_dos.*) - ARRAY['id','id_cliente','id_tipo','fecha','hora','ip','codigo_pais','requests','ratio','as_owner','isp','vpn','score_final','riesgo'] AS extra
  FROM public.alertas_dos

  UNION ALL

  -- Fuerza bruta (corrigido ratio)
  SELECT
    id,
    id_cliente,
    id_tipo,
    fecha,
    hora,
    ip,
    codigo_pais::text AS codigo_pais,
    NULL::integer AS requests,
    intentos::integer AS intentos,
    ratio::numeric,   -- aquí ya es 'ratio'
    as_owner,
    isp,
    vpn,
    score_final,
    riesgo,
    'fuerza_bruta' AS tipo_alerta,
    to_jsonb(alertas_fuerza_bruta.*) - ARRAY['id','id_cliente','id_tipo','fecha','hora','ip','codigo_pais','intentos','ratio','as_owner','isp','vpn','score_final','riesgo'] AS extra
  FROM public.alertas_fuerza_bruta

  UNION ALL

  -- Login sospechoso
  SELECT
    id,
    id_cliente,
    id_tipo,
    fecha,
    hora,
    ip,
    pais::text AS codigo_pais,         
    NULL::integer AS requests,
    intentos::integer AS intentos,
    ratio_intentos::numeric AS ratio,   -- aquí sí se llama 'ratio_intentos'
    NULL::text AS as_owner,
    isp,
    NULL::boolean AS vpn,
    score_vt::numeric    AS score_final, 
    score_abuse::text    AS riesgo,      
    'login_sospechoso' AS tipo_alerta,
    to_jsonb(alertas_login_sospechoso.*) - ARRAY['id','id_cliente','id_tipo','fecha','hora','ip','pais','intentos','ratio_intentos','isp','score_vt','score_abuse'] AS extra
  FROM public.alertas_login_sospechoso

  UNION ALL

  -- Phishing
  SELECT
    id,
    id_cliente,
    id_tipo,
    fecha,
    hora,
    NULL::text AS ip,
    NULL::text AS codigo_pais,
    NULL::integer AS requests,
    NULL::integer AS intentos,
    NULL::numeric AS ratio,
    NULL::text AS as_owner,
    NULL::text AS isp,
    NULL::boolean AS vpn,
    score_final,
    risk_level AS riesgo,   -- en phishing se llama risk_level
    'phishing' AS tipo_alerta,
    to_jsonb(alertas_phishing.*) - ARRAY['id','id_cliente','id_tipo','fecha','hora','ip','url','score_final','risk_level'] AS extra
  FROM public.alertas_phishing
) all_alerts
ORDER BY fecha DESC NULLS LAST, id ASC;
`,

  // USERS
  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (name, email, hashed_password) VALUES ($1,$2,$3);`,

  // Alertas
  getAlert: `SELECT * FROM alertas_login_sospechoso;`,
  getAlertPhishing: `SELECT * FROM alertas_phishing;`,
  getAlertDdos: `SELECT * FROM alertas_ddos;`,
  getAlertDos: `SELECT * FROM alertas_dos;`,
  getAlertFuerzaBruta: `SELECT * FROM alertas_fuerza_bruta;`,
};


module.exports = queries;