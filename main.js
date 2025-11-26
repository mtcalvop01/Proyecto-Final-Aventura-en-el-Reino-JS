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
    <p id="nombreJugador">Cazador</p>
    <div id="imgJugador">
        <img src="./Imagenes/imgJugador.svg">
    </div>
  </div>

  <div id="caracteristicas">
    <p id="ataque">Ataque: 0</p>
    <p id="defensa">Defensa: 0</p>
    <p id="vida">Vida: 100</p>
    <p id="puntos">Puntos: 0</p>
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
        <p id=nombreMercado>Mercado Negro</p>
    </div>
    
    
    `;

    const descuentosPorRareza = {
        común: Math.floor(Math.random() * 20),
        raro: Math.floor(Math.random() * 30),
        legendario: Math.floor(Math.random() * 40)
    };

    const productosSeleccionados = new Set();

    mercado.productos.forEach((productoActual, indiceProducto) => {
        const descuentoActual = descuentosPorRareza[productoActual.rareza];
        productoActual.aplicarDescuento(descuentoActual); // aplica descuento en la misma instancia

        const tarjetaProductoDiv = document.createElement('div');
        tarjetaProductoDiv.className = "producto";
        tarjetaProductoDiv.innerHTML = `
        <div id="mercado">
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

        contenedorEscena.append(tarjetaProductoDiv);
    });

    const botonConfirmarCompra = document.createElement('button');
    botonConfirmarCompra.className = "btnCompra"
    botonConfirmarCompra.textContent = "Confirmar compra";
    botonConfirmarCompra.addEventListener('click', () => {
        productosSeleccionados.forEach(producto => jugadorActual.añadirObjeto(producto));
        cambiarEscena(3);
    });

    contenedorEscena.append(botonConfirmarCompra);
    app.append(contenedorEscena);
}



// ========== ESCENA 3 ==========
function escenaEstadoJugador() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.innerHTML = `
    <h2>🎒 Escena 3: Estado del jugador</h2>
    <pre>${jugadorActual.mostrarJugador()}</pre>
    <button id="botonContinuarEscena4">Continuar</button>
  `;
  contenedorEscena.querySelector('#botonContinuarEscena4').addEventListener('click', () => cambiarEscena(4));
  app.append(contenedorEscena);
}

// ========== ESCENA 4 ==========
function escenaMostrarEnemigos() {
  const contenedorEscena = document.createElement('div');

  listaEnemigos = [
    new Enemigo("Goblin", "Enemigo", 15, 50),
    new Enemigo("Orco", "Enemigo", 25, 80),
    new Enemigo("Troll", "Enemigo", 35, 120),
    new Jefe("Dragón", 30, 200, "Llama infernal", 2)
  ];

  contenedorEscena.innerHTML = `<h2>👹Enemigos</h2>`;

  listaEnemigos.forEach(enemigoActual => {
    let descripcion = `${enemigoActual.nombre} (${enemigoActual.tipo}) - Ataque: ${enemigoActual.ataque}, Vida: ${enemigoActual.vida}`;

    // Si es un jefe, añadimos la habilidad
    if (enemigoActual instanceof Jefe) {
      descripcion += `, Habilidad: ${enemigoActual.habilidad}`;
    }

    contenedorEscena.innerHTML += `<p>${descripcion}</p>`;
  });

  const botonIniciarBatallas = document.createElement('button');
  botonIniciarBatallas.textContent = "Iniciar batallas";
  botonIniciarBatallas.addEventListener('click', () => cambiarEscena(5));

  contenedorEscena.append(botonIniciarBatallas);
  app.append(contenedorEscena);
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
function escenaResultadoFinal(jugadorMurio = false) {
  const contenedorEscena = document.createElement('div');

  // Si el jugador murió, siempre es Novato
  const nivelJugadorFinal = jugadorMurio ? "Novato" : (jugadorActual.puntos >= 50 ? "Veterano" : "Novato");

  contenedorEscena.innerHTML = `
    <h2>🏁 Resultado Final</h2>
    <p>${jugadorActual.nombre} ha conseguido ${jugadorActual.puntos} puntos.</p>
    <p>Nivel alcanzado: <strong>${nivelJugadorFinal}</strong></p>
    <button id="botonReiniciarJuego">Volver a empezar</button>
  `;

  contenedorEscena.querySelector('#botonReiniciarJuego').addEventListener('click', () => location.reload());

  app.append(contenedorEscena);
}



// Iniciar juego
cambiarEscena(1);