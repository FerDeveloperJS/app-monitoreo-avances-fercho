import "./SignIn.css";
import { Link } from "react-router-dom";

export default function SignIn() {
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

          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Ingresa tu email" />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input type="password" placeholder="Ingresa tu contraseña" />
            </div>

            <button className="btn">Ingresar</button>
          </form>

          {/* ENLACE */}
          <div className="redirect-text">
            ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
