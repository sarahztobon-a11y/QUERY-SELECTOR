const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = new FormData(formulario);
    const aprendiz = {};

    for (const [campo, valor] of datos.entries()) {
        aprendiz[campo] = valor;
    }


    aprendiz.acepta = datos.has("acepta") ? "Sí" : "No";

    
    localStorage.setItem("aprendiz", JSON.stringify(aprendiz));

    mostrarAprendiz(aprendiz);
});

function mostrarAprendiz(aprendiz) {
    resultado.replaceChildren();

    for (const campo in aprendiz) {
        const parrafo = document.createElement("p");
        parrafo.textContent = `${campo}: ${aprendiz[campo]}`;
        resultado.appendChild(parrafo);
    }
}


const aprendizGuardado = localStorage.getItem("aprendiz");

if (aprendizGuardado) {
    mostrarAprendiz(JSON.parse(aprendizGuardado));
}