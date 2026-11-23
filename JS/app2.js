const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = new FormData(formulario);
    const mascota = {};

    for (const [campo, valor] of datos.entries()) {
        if (Object.prototype.hasOwnProperty.call(mascota, campo)) {
            if (!Array.isArray(mascota[campo])) {
                mascota[campo] = [mascota[campo]];
            }
            mascota[campo].push(valor);
        } else {
            mascota[campo] = valor;
        }
    }

    localStorage.setItem("mascota", JSON.stringify(mascota));
    mostrarMascota(mascota);
});

function mostrarMascota(mascota) {
    resultado.replaceChildren();

    for (const campo in mascota) {
        const fila = document.createElement("tr");
        const celdaCampo = document.createElement("td");
        const celdaValor = document.createElement("td");

        celdaCampo.textContent = campo;
        celdaValor.textContent = Array.isArray(mascota[campo])
            ? mascota[campo].join(", ")
            : mascota[campo];

        fila.append(celdaCampo, celdaValor);
        resultado.appendChild(fila);
    }
}

const mascotaGuardada = localStorage.getItem("mascota");

if (mascotaGuardada) {
    mostrarMascota(JSON.parse(mascotaGuardada));
}