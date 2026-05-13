import "./SignIn.css";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { supabase } from "../../supabase/client";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    // LOGIN AUTH
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // BUSCAR USUARIO EN TABLA
    const { data: usuario, error: userError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      alert(userError.message);
      return;
    }

    // VALIDAR ROL
    if (usuario.rol === "psicologo") {
      navigate("/psicologo");
    }

    // OTROS ROLES
    else if (usuario.rol === "administrador") {
      navigate("/admin");
    } else if (usuario.rol === "docente") {
      navigate("/docente");
    } else {
      alert("Rol no reconocido");
    }
  };

  return (
    <div className="signin-container">
      {/* PANEL IZQUIERDO */}
      <div className="left-panel">
        <div className="logo">
          Sistema de Permanencia <br />
          Estudiantil
        </div>

        <div className="left-content">
          <h1>Bienvenido de nuevo</h1>

          <p>Inicia sesión para acceder a tu panel académico.</p>

          <div className="floating-card">
            <h3>Acceso rápido</h3>

            <p>Consulta alertas, reportes y seguimiento estudiantil.</p>
          </div>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="right-panel">
        <div className="form-container">
          <h2>Iniciar sesión</h2>

          <p className="subtitle">Ingresa tus credenciales.</p>

          <form onSubmit={handleSubmit}>
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

            <button className="btn">Ingresar</button>
          </form>

          <div className="redirect-text">
            ¿No tienes cuenta?
            <Link to="/signup"> Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
