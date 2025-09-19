import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setMsg({ type: "", text: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API}/users/login`,
        {
          email: form.email.trim().toLowerCase(),
          password: form.password,
        },
        { withCredentials: true }
      );

      setMsg({ type: "ok", text: data.msg || "Login correcto" });
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <section className="auth__card">
        <header className="auth__header">
          <h1>Inicia sesión</h1>
          <p>Plataforma SIRP — Capgemini</p>
        </header>

        {msg.text && (
          <div className={`alert ${msg.type === "error" ? "alert--error" : "alert--ok"}`}>
            {msg.text}
          </div>
        )}

        <form className="auth__form" onSubmit={onSubmit}>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={onChange} />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p className="muted">
          ¿No tienes cuenta? <a href="/signup">Crear una cuenta</a>
        </p>
      </section>
    </main>
  );
}
