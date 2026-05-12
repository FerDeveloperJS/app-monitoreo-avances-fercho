import "./SignUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../supabase/client";

export default function SignUp() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    password: "",
  });

  // CAPTURAR INPUTS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ENVIAR DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // REGISTRO AUTH
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    // GUARDAR DATOS EXTRA
    const { error: insertError } = await supabase.from("estudiantes").insert([
      {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
      },
    ]);

    if (insertError) {
      console.log(insertError);
      alert(insertError.message);
      return;
    }

    alert("Usuario registrado correctamente");

    setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="signup-container">
      {/* PANEL IZQUIERDO */}
      <div className="left-panel">
        <div className="logo">
          Sistema de Permanencia <br />
          Estudiantil
        </div>

        <div className="left-content">
          <h1>Únete al sistema</h1>

          <p>Registra tu información para acceder a la plataforma académica.</p>

          <div className="floating-card">
            <h3>Registro Seguro</h3>

            <p>Tus datos serán protegidos mediante autenticación segura.</p>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="right-panel">
        <div className="form-container">
          <h2>Crear cuenta</h2>

          <p className="subtitle">Completa los siguientes campos.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nombre</label>

              <input
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Apellido</label>

              <input
                type="text"
                name="apellido"
                placeholder="Ingresa tu apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Cédula</label>

              <input
                type="text"
                name="cedula"
                placeholder="Ingresa tu cédula"
                value={formData.cedula}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>

              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="btn">Registrarse</button>
          </form>

          <div className="redirect-text">
            ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
