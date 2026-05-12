import "./SignUp.css";
import { Link } from "react-router-dom";

export default function SignUp() {
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

          <form>
            <div className="input-group">
              <label>Nombre</label>
              <input type="text" placeholder="Ingresa tu nombre" />
            </div>

            <div className="input-group">
              <label>Apellido</label>
              <input type="text" placeholder="Ingresa tu apellido" />
            </div>

            <div className="input-group">
              <label>Cédula</label>
              <input type="text" placeholder="Ingresa tu cédula" />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Ingresa tu email" />
            </div>

            <button className="btn">Registrarse</button>
          </form>

          {/* ENLACE */}
          <div className="redirect-text">
            ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
