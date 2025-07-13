function crearMalla() {
  const contenedor = document.getElementById("malla");

  ramos.forEach((bloque) => {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = bloque.semestre;
    semestreDiv.appendChild(titulo);

    bloque.ramos.forEach((ramo) => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo bloqueado";
      ramoDiv.id = ramo.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.disabled = true;

      const label = document.createElement("label");
      label.textContent = ramo.nombre;
      label.setAttribute("for", ramo.id);

      const desbloqueos = document.createElement("div");
      desbloqueos.className = "desbloqueos";
      desbloqueos.textContent = ramo.desbloquea.length
        ? "Desbloquea: " + ramo.desbloquea.map(d => getNombreRamoPorId(d)).join(", ")
        : "";

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          ramoDiv.classList.add("aprobado");
          ramo.desbloquea.forEach(id => {
            const desbloqueado = document.getElementById(id);
            if (desbloqueado) {
              desbloqueado.classList.remove("bloqueado");
              desbloqueado.querySelector("input").disabled = false;
            }
          });
        } else {
          ramoDiv.classList.remove("aprobado");
        }
      });

      ramoDiv.appendChild(checkbox);
      ramoDiv.appendChild(label);
      ramoDiv.appendChild(desbloqueos);
      semestreDiv.appendChild(ramoDiv);
    });

    contenedor.appendChild(semestreDiv);
  });

  activarIniciales();
}

function activarIniciales() {
  document.querySelectorAll(".ramo").forEach((el) => {
    const checkbox = el.querySelector("input");
    const id = el.id;
    const tieneRequisito = ramos.some(bloque =>
      bloque.ramos.some(r => r.desbloquea.includes(id))
    );
    if (!tieneRequisito) {
      el.classList.remove("bloqueado");
      checkbox.disabled = false;
    }
  });
}

function getNombreRamoPorId(id) {
  for (const bloque of ramos) {
    for (const ramo of bloque.ramos) {
      if (ramo.id === id) {
        return ramo.nombre.split(" (")[0];
      }
    }
  }
  return id;
}

crearMalla();
