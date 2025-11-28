import { Jugador } from './Jugador.js';
import { Enemigo } from './Enemigo.js';
import {Jefe} from './Jefe.js';
import { Producto } from './Producto.js';
import { mercado } from './Mercado.js';
import { Batalla } from './Batalla.js';
import { clasificarJugador } from './Ranking.js';
import { vidaMax, umbral } from './constants/constants.js';

const app = document.getElementById('app');
let jugadorActual;
let numeroEscenaActual = 1;
let listaEnemigos = [];
let indiceBatallaActual = 0;

function cambiarEscena(numeroEscena) {
  numeroEscenaActual = numeroEscena;
  app.innerHTML = "";
  if (numeroEscena === 1) escenaCrearJugador();
  if (numeroEscena === 2) escenaMercado();
  if (numeroEscena === 3) escenaEstadoJugador();
  if (numeroEscena === 4) escenaMostrarEnemigos();
  if (numeroEscena === 5) escenaBatallas();
  if (numeroEscena === 6) escenaResultadoFinal();
}

// ========== ESCENA 1 ==========
function escenaCrearJugador() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena1"
  contenedorEscena.innerHTML = `
  <div class="cabeceraJugador">
    <p class="nombreJugador">Cazador</p>
    <div class="imgJugador">
        <img src="./Imagenes/imgJugador.png">
    </div>
  </div>

  <div class="caracteristicas">
    <p class="ataque">Ataque: 0</p>
    <p class="defensa">Defensa: 0</p>
    <p class="vida">Vida: 100</p>
    <p class="puntos">Puntos: 0</p>
  </div>

  <div id="boton">
        <button id="botonContinuar">Continuar</button>
</div>
`;

  jugadorActual = new Jugador("Cazador", 100, 0, 0);

  contenedorEscena.querySelector('#botonContinuar').addEventListener('click', () => {
    cambiarEscena(2); 
  });

  app.append(contenedorEscena);
}



// ========== ESCENA 2 ==========


function escenaMercado() {
    const contenedorEscena = document.createElement('div');
    contenedorEscena.className = "escena2"
    contenedorEscena.innerHTML = `
        <div class="cabeceraMercado">
            <p id="nombreMercado">Mercado Negro</p>
        </div>
    `;

    const descuentosPorRareza = {
        común: Math.floor(Math.random() * 20),
        raro: Math.floor(Math.random() * 30),
        legendario: Math.floor(Math.random() * 40)
    };

    const productosSeleccionados = new Set();

    const contenedorProductos = document.createElement("div");
    contenedorProductos.className = "contenedor-productos"; 

    mercado.productos.forEach((productoActual, indiceProducto) => {
        const descuentoActual = descuentosPorRareza[productoActual.rareza];
        productoActual.aplicarDescuento(descuentoActual); 

        const tarjetaProductoDiv = document.createElement('div');
        tarjetaProductoDiv.className = "producto";
        tarjetaProductoDiv.innerHTML = `
            <img src="${productoActual.imagenURL}" alt="${productoActual.nombre}">
            <p>${productoActual.presentar()}</p>
            <p>${productoActual.precio} €</p>
            <button id="botonSeleccionarProducto${indiceProducto}">
                ${productosSeleccionados.has(productoActual) ? "Retirar" : "Añadir"}
            </button>
        `;


        const boton = tarjetaProductoDiv.querySelector(`#botonSeleccionarProducto${indiceProducto}`);
        boton.addEventListener('click', () => {
            if (productosSeleccionados.has(productoActual)) {
                productosSeleccionados.delete(productoActual);
                tarjetaProductoDiv.classList.remove('seleccionado');
            } else {
                productosSeleccionados.add(productoActual);
                tarjetaProductoDiv.classList.add('seleccionado');
            }
        });

        // Añadir tarjeta al contenedor de productos
        contenedorProductos.appendChild(tarjetaProductoDiv);
    });

    // Añadir contenedor de productos a la escena
    contenedorEscena.appendChild(contenedorProductos);

    const contenedorBtnCompra = document.createElement('div');
contenedorBtnCompra.className = "contenedorBtnCompra";

    const botonConfirmarCompra = document.createElement('button');
botonConfirmarCompra.className = "btnCompra";
botonConfirmarCompra.textContent = "Confirmar Compra";

        botonConfirmarCompra.addEventListener('click', () => {
        productosSeleccionados.forEach(producto => jugadorActual.añadirObjeto(producto));
        cambiarEscena(3);
    });

    contenedorBtnCompra.appendChild(botonConfirmarCompra);
    contenedorEscena.appendChild(contenedorBtnCompra);

    app.append(contenedorEscena);
}




// ========== ESCENA 3 ==========
function escenaEstadoJugador() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena3";

  contenedorEscena.innerHTML = `
    <div class="cabeceraJugador">
      <p class="nombreJugador">${jugadorActual.nombre}</p>
      <div class="imgJugador">
        <img src="./Imagenes/imgJugador.svg">
      </div>
    </div>

    <div class="caracteristicas">
      <p class="ataque">Ataque: ${jugadorActual.ataqueTotal}</p>
      <p class="defensa">Defensa: ${jugadorActual.defensaTotal}</p>
      <p class="vida">Vida: ${jugadorActual.vida}</p>
      <p class="puntos">Puntos: ${jugadorActual.puntos}</p>
    </div>

    <div class="inventario"></div>

    <div class="boton">
      <button id="botonContinuarEscena4">Continuar</button>
    </div>
  `;

  contenedorEscena
    .querySelector('#botonContinuarEscena4')
    .addEventListener('click', () => cambiarEscena(4));

  app.append(contenedorEscena);
}


// ========== ESCENA 4 ==========
function escenaMostrarEnemigos() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena4";
  contenedorEscena.innerHTML = `
    <div class="cabeceraEnemigos">
      <p class="nombreEnemigos">Enemigos Disponibles</p>
    </div>
  `;

  listaEnemigos = [
    new Enemigo("Goblin", "./Imagenes/goblin.svg", "Enemigo", 15, 50),
    new Enemigo("Orco", "./Imagenes/orco.svg", "Enemigo", 25, 80),
    new Enemigo("Troll", "./Imagenes/troll.svg", "Enemigo", 35, 120),
    new Jefe("Dragón", "./Imagenes/dragon.svg", 30, 200, "Llama infernal", 2),
    new Enemigo("Esqueleto", "./Imagenes/esqueleto.svg", "Enemigo", 20, 60),
    new Enemigo("Hombre de Hierro", "./Imagenes/hierro.svg", "Enemigo", 28, 90)
  ];

  const contenedorEnemigos = document.createElement("div");
  contenedorEnemigos.className = "contenedor-enemigos";

  listaEnemigos.forEach(enemigo => {
    const card = document.createElement('div');
    card.className = "tarjetaEnemigo";

    card.innerHTML = `
      <div class="imgEnemigo">
        <p id="nombreEnemigo">${enemigo.nombre}</p>
        <img src="${enemigo.imagen || "./Imagenes/defaultEnemigo.svg"}">
      </div>

      <div class="statsEnemigo">
        <p>Vida: ${enemigo.vida}</p>
        <p>Ataque: ${enemigo.ataque}</p>
        ${enemigo instanceof Jefe ? `<p>Habilidad: ${enemigo.habilidad}</p>` : ''}
      </div>
    `;

    contenedorEnemigos.appendChild(card); 
  });

  // Añadir contenedor de enemigos a la escena
  contenedorEscena.appendChild(contenedorEnemigos);

  // Contenedor externo para el botón
  const contenedorBtnBatalla = document.createElement('div');
  contenedorBtnBatalla.className = "contenedorBtnBatalla";

  const botonIniciarBatallas = document.createElement('button');
  botonIniciarBatallas.className = "btnBatalla";
  botonIniciarBatallas.textContent = "Iniciar batallas";

  botonIniciarBatallas.addEventListener('click', () => cambiarEscena(5));

  // Poner el botón dentro del contenedor
  contenedorBtnBatalla.appendChild(botonIniciarBatallas);

  // Añadir el contenedor del botón al final de la escena
  contenedorEscena.appendChild(contenedorBtnBatalla);

  // Añadir toda la escena a la app
  app.appendChild(contenedorEscena);
}



// ========== ESCENA 5 ==========
function escenaBatallas() {
  app.innerHTML = ""; // Limpiar la pantalla

  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escenaBatallas";

  const enemigoActual = listaEnemigos[indiceBatallaActual];

  if (!enemigoActual) {
    console.error("No hay enemigo actual, índice:", indiceBatallaActual);
    return;
  }

  // --- Mostrar título ---
  const titulo = document.createElement('div');
  titulo.className = "cabeceraBatallas";
  titulo.textContent = `Batalla contra ${enemigoActual.nombre}`;
  contenedorEscena.appendChild(titulo);

  // --- Contenedor de imágenes de batalla ---
  const contenedorImagenes = document.createElement('div');
  contenedorImagenes.className = "contenedorImagenesBatalla";

  // Imagen del jugador
  const imgJugador = document.createElement('img');
  imgJugador.src = "./Imagenes/imgGuerrera.svg"; // jugadorActual debe tener la propiedad 'imagen'
  imgJugador.alt = jugadorActual.nombre;
  imgJugador.className = "imgBatalla";

  // Imagen del enemigo
  const imgEnemigo = document.createElement('img');
  imgEnemigo.src = enemigoActual.imagen; // propiedad 'imagen' de Enemigo
  imgEnemigo.alt = enemigoActual.nombre;
  imgEnemigo.className = "imgBatalla";

  // Agregamos las imágenes al contenedor
  contenedorImagenes.appendChild(imgJugador);
  contenedorImagenes.appendChild(imgEnemigo);

  // Agregamos el contenedor de imágenes a la escena
  contenedorEscena.appendChild(contenedorImagenes);

  // --- Ejecutar batalla ---
  const resultado = Batalla(enemigoActual, jugadorActual);

  // --- Mostrar resultado de la batalla ---
  const resultadoTexto = document.createElement('p');
  if (resultado.ganador === "jugador") {
resultadoTexto.innerHTML = `Ganador: <strong>${jugadorActual.nombre}</strong><br>Puntos ganados: ${resultado.puntos}`;
  }else{
    resultadoTexto.innerHTML = `Ganador: <strong>${enemigoActual.nombre}</strong> ha derrotado a ${jugadorActual.nombre}`;
  }
  resultadoTexto.className = "resultadoBatalla";
  contenedorEscena.appendChild(resultadoTexto);

  // --- Botón siguiente batalla ---
  const botonSiguiente = document.createElement('button');
  botonSiguiente.className = "btnBatalla";

  if (resultado.jugadorMurio) {
    botonSiguiente.textContent = "Ver resultado final";
    botonSiguiente.addEventListener('click', () => cambiarEscena(6, true));
  } else {
    botonSiguiente.textContent = (indiceBatallaActual < listaEnemigos.length - 1) ? "Siguiente batalla" : "Ver resultado final";
    botonSiguiente.addEventListener('click', () => {
      indiceBatallaActual++;
      if (indiceBatallaActual < listaEnemigos.length) {
        escenaBatallas(); // siguiente batalla
      } else {
        cambiarEscena(6, false);
      }
    });
  }

  contenedorEscena.appendChild(botonSiguiente);

  app.appendChild(contenedorEscena);
}





// ========== ESCENA 6 ==========
function escenaResultadoFinal(jugadorMurio = false, ultimoEnemigo = null) {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena6"
  const nivelJugadorFinal = jugadorMurio ? "Novato" : (jugadorActual.puntos >= 50 ? "Veterano" : "Novato");

  contenedorEscena.innerHTML = `
    <div class="cabeceraFinal">
      <p class="nombreCabecera">Resultado Final</p>
    </div>
    <div class="contenedorFinal">
    <p>${jugadorActual.nombre} a logrado ser un <strong>${nivelJugadorFinal}</p>
    <p>Puntos totales:${jugadorActual.puntos}
      <button id="botonReiniciarJuego">Reiniciar</button>
    </div>
  `;

  contenedorEscena.querySelector('#botonReiniciarJuego')
    .addEventListener('click', () => location.reload());

  app.appendChild(contenedorEscena);
}




// Iniciar juego
cambiarEscena(1);