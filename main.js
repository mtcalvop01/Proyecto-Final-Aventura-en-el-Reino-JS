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
        <img src="./Imagenes/imgJugador.svg">
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

    const botonConfirmarCompra = document.createElement('button');
    botonConfirmarCompra.className = "btnCompra"
    botonConfirmarCompra.textContent = "Confirmar compra";
    botonConfirmarCompra.addEventListener('click', () => {
        productosSeleccionados.forEach(producto => jugadorActual.añadirObjeto(producto));
        cambiarEscena(3);
    });

    contenedorEscena.appendChild(botonConfirmarCompra);
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
  new Enemigo("Goblin", "", "Enemigo", 15, 50),
  new Enemigo("Orco", "", "Enemigo", 25, 80),
  new Enemigo("Troll", "", "Enemigo", 35, 120),
  new Jefe("Dragón", "", 30, 200, "Llama infernal", 2),
  new Enemigo("Esqueleto", "", "Enemigo", 20, 60),
  new Enemigo("Hombre Lobo", "", "Enemigo", 28, 90)
];


  const contenedorEnemigos = document.createElement("div");
  contenedorEnemigos.className = "contenedor-enemigos";

  listaEnemigos.forEach(enemigo => {
    const card = document.createElement('div');
    card.className = "tarjetaEnemigo";

    card.innerHTML = `
      <div class="imgEnemigo">
      <p id=nombreEnemigo>${enemigo.nombre}</p>
      <img src="${enemigo.img || "./Imagenes/defaultEnemigo.png"}">
      </div>

      <div class="statsEnemigo">
        <p>Vida: ${enemigo.vida}</p>
        <p>Ataque: ${enemigo.ataque}</p>
        ${enemigo instanceof Jefe ? `<p>Habilidad: ${enemigo.habilidad}</p>` : ''}
      </div>
    `;

    contenedorEnemigos.appendChild(card); 
  });

  contenedorEscena.appendChild(contenedorEnemigos);

  const botonIniciarBatallas = document.createElement('button');
  botonIniciarBatallas.textContent = "Iniciar batallas";
  botonIniciarBatallas.addEventListener('click', () => cambiarEscena(5));

  contenedorEscena.appendChild(botonIniciarBatallas);
  app.appendChild(contenedorEscena);
}




// ========== ESCENA 5 ==========
function escenaBatallas() {
  app.innerHTML = ""; // Limpiar la pantalla

  const contenedorEscena = document.createElement('div');
  const enemigoActual = listaEnemigos[indiceBatallaActual];

  contenedorEscena.innerHTML = `<h2>⚔️ Batalla contra ${enemigoActual.nombre}</h2>`;

  // --- Ejecutar la batalla ---
  const resultado = Batalla(enemigoActual, jugadorActual);

  let textoResultado = "";
  if (resultado.ganador === "jugador") {
    textoResultado = `🎉 ${jugadorActual.nombre} ha vencido a ${enemigoActual.nombre} y gana ${resultado.puntos} puntos!`;
  } else {
    textoResultado = `💀 ${enemigoActual.nombre} ha derrotado a ${jugadorActual.nombre}! La partida ha terminado.`;
  }

  contenedorEscena.innerHTML += `
    <p>${textoResultado}</p>
    <pre>${jugadorActual.mostrarJugador()}</pre>
  `;

  const botonSiguienteBatalla = document.createElement('button');

  if (resultado.jugadorMurio) {
    // Si el jugador murió, vamos directo al resultado final
    botonSiguienteBatalla.textContent = "Ver resultado final";
    botonSiguienteBatalla.addEventListener('click', () => {
      cambiarEscena(6, true); // pasar flag indicando que murió
    });
  } else {
    // Si sobrevivió, permitir siguiente batalla o ver resultado final
    botonSiguienteBatalla.textContent = (indiceBatallaActual < listaEnemigos.length - 1) ? "Siguiente batalla" : "Ver resultado final";
    botonSiguienteBatalla.addEventListener('click', () => {
      indiceBatallaActual++;
      if (indiceBatallaActual < listaEnemigos.length) {
        escenaBatallas(); // siguiente batalla
      } else {
        cambiarEscena(6, false); // jugador sobrevivió
      }
    });
  }

  contenedorEscena.append(botonSiguienteBatalla);
  app.append(contenedorEscena);
}



// ========== ESCENA 6 ==========
function escenaResultadoFinal(jugadorMurio = false, ultimoEnemigo = null) {
  const contenedorEscena = document.createElement('div');
  const nivelJugadorFinal = jugadorMurio ? "Novato" : (jugadorActual.puntos >= 50 ? "Veterano" : "Novato");

  contenedorEscena.innerHTML = `
    <div class="cabeceraFinal">
      <p class="nombreCabecera">Resultado Final</p>
    </div>
    <div class="contenedorFinal">
      <p class="vs">
        <img src="./Imagenes/imgJugador.svg">
        ${ultimoEnemigo ? 'VS<img src="' + ultimoEnemigo.imagenURL + '">' : ''}
      </p>
      <p>${jugadorActual.nombre} ha conseguido ${jugadorActual.puntos} puntos.</p><br><br>
      <p id="nivelAlcanzado">Nivel alcanzado: <strong>${nivelJugadorFinal}</strong></p>
      <button id="botonReiniciarJuego">Volver a empezar</button>
    </div>
  `;

  contenedorEscena.querySelector('#botonReiniciarJuego')
    .addEventListener('click', () => location.reload());

  app.appendChild(contenedorEscena);
}




// Iniciar juego
cambiarEscena(1);