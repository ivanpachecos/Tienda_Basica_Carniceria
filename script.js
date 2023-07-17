let swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});

// Carrito

const carrito = document.getElementById("carrito");
const elementos = document.getElementById("lista");
const elemento2 = document.getElementById("lista-2");
const lista = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  elementos.addEventListener("click", comprarElemento);
  elemento2.addEventListener("click", comprarElemento);

  carrito.addEventListener("click", eliminarElemento);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const elemento = e.target.parentElement.parentElement;

    leerDatosElementos(elemento);
  }
}

function leerDatosElementos(elemento) {
  const infoElemento = {
    imagen: elemento.querySelector("img").src,
    titulo: elemento.querySelector("h3").textContent,
    precio: elemento.querySelector(".precio").textContent,
    id: elemento.querySelector("a").getAttribute("data-id"),
  };

  insetarCarrito(infoElemento);
}

function insetarCarrito(elemento) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <img src="${elemento.imagen}" width=100>
    </td>

    <td>
      ${elemento.titulo} 
    </td>
    
    <td>
      ${elemento.precio} 
    </td>

    <td>
      <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td> 
  `;

  lista.appendChild(row);
  guardarElementoLocalStorage(elemento);
}

function eliminarElemento(e) {
  e.preventDefault();
  let elemento, elementoid;

  if (e.target.classList.contains("borrar")) {
    e.target.parentElement.parentElement.remove();
    elemento = e.target.parentElement.parentElement;
    elementoid = elemento.querySelector("a").getAttribute("data-id");
  }

  eliminarElementoLocalStorage(elementoid);
}

function vaciarCarrito() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  vaciarLocalStorage();
  return false;
}

function guardarElementoLocalStorage(elemento) {
  let elementos = obtenerElementosLocalStorage();
  elementos.push(elemento);
  localStorage.setItem("elementos", JSON.stringify(elementos));
}

function obtenerElementosLocalStorage() {
  let elementoLs;

  if (localStorage.getItem("elementos") === null) {
    elementoLs = [];
  } else {
    elementoLs = JSON.parse(localStorage.getItem("elementos"));
  }
  return elementoLs;
}

function leerLocalStorage() {
  let elementoLs = obtenerElementosLocalStorage();
  elementoLs.forEach(function (elemento) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
      <img src="${elemento.imagen}" width=100>
    </td>

    <td>
      ${elemento.titulo} 
    </td>
    
    <td>
      ${elemento.precio} 
    </td>

    <td>
      <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td> 
  `;

    lista.appendChild(row);
  });
}

function eliminarElementoLocalStorage(elemento) {
  let elementoLs = obtenerElementosLocalStorage();
  elementoLs.forEach(function (elementoLs, index) {
    if (elementoLs.id === elemento) {
      elementoLs.splice(index, 1);
    }
  });

  localStorage.setItem("elementos", JSON.stringify(elementoLs));
}

function vaciarLocalStorage() {
  localStorage.clear();
}