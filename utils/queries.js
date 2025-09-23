const queries = {
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