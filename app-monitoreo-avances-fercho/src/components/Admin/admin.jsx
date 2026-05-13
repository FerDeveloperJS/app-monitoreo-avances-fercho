import "./Admin.css";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";

export default function AdminDashboard() {
  const [usuario, setUsuario] = useState(null);

  const alertas = [
    {
      estudiante: "Carlos Pérez",
      riesgo: "Alto",
      programa: "Ingeniería",
      estado: "Pendiente",
    },
    {
      estudiante: "Laura Gómez",
      riesgo: "Medio",
      programa: "Derecho",
      estado: "En seguimiento",
    },
    {
      estudiante: "Juan Díaz",
      riesgo: "Bajo",
      programa: "Arquitectura",
      estado: "Resuelto",
    },
    {
      estudiante: "María Torres",
      riesgo: "Alto",
      programa: "Psicología",
      estado: "Pendiente",
    },
  ];

  useEffect(() => {
    const obtenerUsuario = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
        return;
      }

      const { data: usuarioData, error: userError } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (userError) {
        console.log(userError);
        return;
      }

      setUsuario(usuarioData);
    };

    obtenerUsuario();
  }, []);

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Sistema</h2>

        <ul>
          <li className="active">Inicio</li>
          <li>Usuarios y roles</li>
          <li>Integración de datos</li>
          <li>Alertas del sistema</li>
          <li>Intervenciones</li>
          <li>Reportes</li>
          <li>Configuración</li>
          <li>Cerrar sesión</li>
        </ul>
      </aside>

      <main className="main">
        <header className="header">
          <input
            type="text"
            placeholder="Buscar estudiantes, cursos..."
          />

          <div className="user">
            <img src="https://i.pravatar.cc/40" alt="Usuario" />

            <span>
              Admin. {usuario?.nombre} {usuario?.apellido}
            </span>
          </div>
        </header>

        <section className="content">
          <h1>Panel administrativo</h1>

          <div className="dashboard-cards">
            <div className="top-card">
              <h3>Estudiantes totales</h3>
              <p>2,350</p>
            </div>

            <div className="top-card danger">
              <h3>En riesgo alto</h3>
              <p>210</p>
            </div>

            <div className="top-card warning">
              <h3>En riesgo medio</h3>
              <p>540</p>
            </div>

            <div className="top-card success">
              <h3>En riesgo bajo</h3>
              <p>1,600</p>
            </div>

            <div className="top-card">
              <h3>Intervenciones</h3>
              <p>156</p>
            </div>

            <div className="top-card success">
              <h3>Tasa permanencia</h3>
              <p>88%</p>
            </div>
          </div>

          <div className="charts">
            <div className="chart-card">
              <h3>Distribución de riesgo</h3>

              <div className="fake-chart donut"></div>

              <div className="legend">
                <span className="red"></span> Alto
                <span className="yellow"></span> Medio
                <span className="green"></span> Bajo
              </div>
            </div>

            <div className="chart-card">
              <h3>Alertas por atender</h3>

              <div className="alerts-box">
                <div>
                  <span>Críticas</span>
                  <strong>18</strong>
                </div>

                <div>
                  <span>Medias</span>
                  <strong>32</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>50</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="table-section">
            <div className="table-header">
              <h2>Alertas del sistema</h2>

              <button className="filter-btn">Filtrar</button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Riesgo</th>
                  <th>Programa</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {alertas.map((alerta, index) => (
                  <tr key={index}>
                    <td>{alerta.estudiante}</td>

                    <td>
                      <span
                        className={`badge ${
                          alerta.riesgo === "Alto"
                            ? "badge-red"
                            : alerta.riesgo === "Medio"
                            ? "badge-yellow"
                            : "badge-green"
                        }`}
                      >
                        {alerta.riesgo}
                      </span>
                    </td>

                    <td>{alerta.programa}</td>

                    <td>{alerta.estado}</td>

                    <td>
                      <button className="btn-view">
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div className="card">
              <h3>Usuarios activos</h3>
              <p>145</p>
            </div>

            <div className="card">
              <h3>Encuestas completadas</h3>
              <p>1,240</p>
            </div>

            <div className="card">
              <h3>Casos cerrados</h3>
              <p>86</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}