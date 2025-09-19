import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setMsg({ type: "", text: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API}/users/register`,
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        },
        { withCredentials: true }
      );

      setMsg({ type: "ok", text: data.message || "Usuario registrado" });
      setForm({ name: "", email: "", password: "", confirm: "" });
        setTimeout(() => {
        navigate("/login");
      }, 1500);
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
          <h1>Crea tu cuenta</h1>
          <p>Plataforma SIRP — Capgemini</p>
        </header>

        {msg.text && (
          <div className={`alert ${msg.type === "error" ? "alert--error" : "alert--ok"}`}>
            {msg.text}
          </div>
        )}

        <form className="auth__form" onSubmit={onSubmit}>
          <div className="field">
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={onChange} />
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={onChange} />
          </div>
          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={onChange} />
          </div>
          <div className="field">
            <label>Repite la contraseña</label>
            <input name="confirm" type="password" value={form.confirm} onChange={onChange} />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creando…" : "Crear cuenta"}
          </button>
        </form>

        <p className="muted">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </section>
    </main>
  );
}
