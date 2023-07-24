function obtenerDatosDesdeJSON() {
  return fetch('data.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener los datos desde el archivo JSON:', error);
      return [];
    });
}

function calcularStock(cantidadDisponible, cantidadVendida, cantidadConsumida) {
  let stock = cantidadDisponible - cantidadVendida - cantidadConsumida;

  if (stock >= 0) {
    return stock;
  } else {
    return "No hay suficiente stock";
  }
}

let cervezas = [];

// Obtener las cervezas almacenadas en localStorage
let cervezasGuardadas = localStorage.getItem('cervezas');

// Si hay cervezas almacenadas, convertir el JSON a un array
if (cervezasGuardadas) {
  cervezas = JSON.parse(cervezasGuardadas);
}

let nombreCervezaInput = document.getElementById("nombreCerveza");
let cantidadDisponibleInput = document.getElementById("cantidadDisponible");
let cantidadVendidaInput = document.getElementById("cantidadVendida");
let cantidadConsumidaInput = document.getElementById("cantidadConsumida");
let agregarCervezaButton = document.getElementById("agregarCerveza");
let mensajeDiv = document.getElementById("mensaje");
let cervezasContainer = document.getElementById("cervezasContainer"); // Referencia al contenedor de cervezas

function agregarCerveza() {
  let nombreCerveza = nombreCervezaInput.value;
  let cantidadDisponible = parseInt(cantidadDisponibleInput.value);
  let cantidadVendida = parseInt(cantidadVendidaInput.value);
  let cantidadConsumida = parseInt(cantidadConsumidaInput.value);

  let cerveza = {
    nombre: nombreCerveza,
    cantidadDisponible: cantidadDisponible,
    cantidadVendida: cantidadVendida,
    cantidadConsumida: cantidadConsumida
  };

  cervezas.push(cerveza);

  // Guardamos las cervezas en localStorage como JSON
  localStorage.setItem('cervezas', JSON.stringify(cervezas));

  mostrarStockCervezas();
  mostrarAlertaExitosa();
  limpiarFormulario();
}

function mostrarStockCervezas() {
  // Limpiamos el contenido actual del contenedor
  cervezasContainer.innerHTML = '';

  cervezas.forEach(cerveza => {
    cerveza.stockCalculado = calcularStock(cerveza.cantidadDisponible, cerveza.cantidadVendida, cerveza.cantidadConsumida);

    // Creamos los elementos HTML para mostrar la información de cada cerveza
    let div = document.createElement('div');
    div.classList.add('imagen');
    div.setAttribute('data-nombre', cerveza.nombre);
    div.setAttribute('data-precio', '2.50'); 
    div.setAttribute('data-id', cerveza.nombre.toLowerCase().replace(' ', '-'));

    let img = document.createElement('img');
    img.src = './IMG/' + cerveza.nombre + '.png';
    img.alt = cerveza.nombre;

    let span = document.createElement('span');
    span.textContent = cerveza.nombre;

    let pStockInicial = document.createElement('p');
    pStockInicial.textContent = 'Stock Inicial: ';

    let spanStockInicial = document.createElement('span');
    spanStockInicial.id = 'stock' + cerveza.nombre.replace(' ', '');
    spanStockInicial.textContent = cerveza.cantidadDisponible;

    let pStockCalculado = document.createElement('p');
    pStockCalculado.textContent = 'Stock Calculado: ';

    let spanStockCalculado = document.createElement('span');
    spanStockCalculado.id = 'stockCalculado' + cerveza.nombre.replace(' ', '');
    spanStockCalculado.textContent = `Stock Calculado: ${cerveza.stockCalculado}`;

    // Agregamos los elementos al contenedor de cervezas
    pStockInicial.appendChild(spanStockInicial);
    pStockCalculado.appendChild(spanStockCalculado);
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(pStockInicial);
    div.appendChild(pStockCalculado);
    
    // Agregamos la cerveza al contenedor
    cervezasContainer.appendChild(div);
  });
}

function mostrarAlertaExitosa() {
  Swal.fire({
    title: "Cerveza agregada",
    text: "La cerveza ha sido agregada correctamente",
    icon: "success",
    confirmButtonText: "Aceptar"
  });
}

function limpiarFormulario() {
  nombreCervezaInput.value = "";
  cantidadDisponibleInput.value = "";
  cantidadVendidaInput.value = "";
  cantidadConsumidaInput.value = "";
  agregarCervezaButton.disabled = true;
}

// Habilitamos el botón "Agregar cerveza" cuando se completen todos los campos
nombreCervezaInput.addEventListener("input", validarCampos);
cantidadDisponibleInput.addEventListener("input", validarCampos);
cantidadVendidaInput.addEventListener("input", validarCampos);
cantidadConsumidaInput.addEventListener("input", validarCampos);

function validarCampos() {
  let nombreCerveza = nombreCervezaInput.value.trim();
  let cantidadDisponible = cantidadDisponibleInput.value.trim();
  let cantidadVendida = cantidadVendidaInput.value.trim();
  let cantidadConsumida = cantidadConsumidaInput.value.trim();

  if (nombreCerveza !== "" && cantidadDisponible !== "" && cantidadVendida !== "" && cantidadConsumida !== "") {
    agregarCervezaButton.disabled = false;
  } else {
    agregarCervezaButton.disabled = true;
  }
}

agregarCervezaButton.addEventListener("click", agregarCerveza);

// Mostramos las cervezas al cargar la página
mostrarStockCervezas();
