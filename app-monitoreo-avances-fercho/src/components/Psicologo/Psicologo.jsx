import "./Psicologo.css";

import { useEffect, useState } from "react";

import { supabase } from "../../supabase/client";

export default function Psicologo() {
  const [usuario, setUsuario] = useState(null);

  const casos = [
    {
      estudiante: "Carlos Pérez",
      riesgo: "Alto",
      motivo: "Ansiedad",
      actualizacion: "Hace 2 días",
    },
    {
      estudiante: "María Gómez",
      riesgo: "Medio",
      motivo: "Estrés académico",
      actualizacion: "Hoy",
    },
    {
      estudiante: "Laura Díaz",
      riesgo: "Bajo",
      motivo: "Seguimiento emocional",
      actualizacion: "Hace 1 semana",
    },
  ];

  // OBTENER USUARIO
  useEffect(() => {
    const obtenerUsuario = async () => {
      // USUARIO AUTH
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
        return;
      }

      // BUSCAR EN TABLA USUARIOS
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
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Sistema</h2>

        <ul>
          <li className="active">Inicio</li>
          <li>Casos asignados</li>
          <li>Alertas críticas</li>
          <li>Planes de intervención</li>
          <li>Seguimiento</li>
          <li>Reportes</li>
          <li>Cerrar sesión</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <input type="text" placeholder="Buscar estudiante..." />

          <div className="user">
            <img src="https://i.pravatar.cc/40" alt="Usuario" />

            <span>
              Psic. {usuario?.nombre} {usuario?.apellido}
            </span>
          </div>
        </header>

        {/* Content */}
        <section className="content">
          <h1>Casos asignados</h1>

          {/* Tabs */}
          <div className="tabs">
            <button className="active">Todos</button>
            <button>Críticos</button>
            <button>En seguimiento</button>
            <button>Cerrados</button>
          </div>

          {/* Table */}
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Riesgo</th>
                <th>Motivo</th>
                <th>Actualización</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {casos.map((caso, index) => (
                <tr key={index}>
                  <td>{caso.estudiante}</td>
                  <td>{caso.riesgo}</td>
                  <td>{caso.motivo}</td>
                  <td>{caso.actualizacion}</td>

                  <td>
                    <button className="btn-view">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Stats */}
          <div className="stats">
            <div className="card">
              <h3>Casos activos</h3>
              <p>12</p>
            </div>

            <div className="card">
              <h3>Intervenciones</h3>
              <p>8</p>
            </div>

            <div className="card">
              <h3>Cerrados</h3>
              <p>5</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
