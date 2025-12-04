import { Jugador } from './Jugador.js';
import { Enemigo } from './Enemigo.js';
import { Jefe } from './Jefe.js';
import { Producto } from './Producto.js';
import { mercado } from './Mercado.js';
import { Batalla } from './Batalla.js';
import { clasificarJugador } from './Ranking.js';
import { vidaMax, umbral } from './constants/constants.js';

/**
 * Elemento principal de la aplicación donde se renderizan las escenas.
 * @type {HTMLElement}
 */
const app = document.getElementById('app');

/**
 * Instancia del jugador actual.
 * @type {Jugador}
 */
let jugadorActual;

/**
 * Número de la escena actualmente activa.
 * @type {number}
 */
let numeroEscenaActual = 1;

/**
 * Lista de enemigos disponibles para las batallas.
 * @type {Enemigo[]}
 */
let listaEnemigos = [];

/**
 * Índice del enemigo actual en la lista de batallas.
 * @type {number}
 */
let indiceBatallaActual = 0;


/**
 * Cambia la escena actual de la aplicación.
 * @param {number} numeroEscena - Número de la escena a mostrar (1 a 6).
 */
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


/**
 * Escena 1: Creación del jugador
 */
function escenaCrearJugador() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "formularioRegistro"
  
  contenedorEscena.innerHTML = `
  <form class="formularioRegistro">
            <label>Nombre:</label>
            <input type="text" pattern="[^A-Za-z\s]{1, 20}"><br><br>
            <label>Ataque:</label>
            <input type="number" value="0" pattern="[^0\d+$"]><br><br>
            <label>Defensa:</label>
            <input type="number" value="0" pattern="[^0\d+?$]"><br><br>
            <label>Vida:</label>
            <input type="number" value="100" pattern="[^100\d+$]"><br><br>
            <button id=botonContinuar>Continuar</button>
        </form>`
        jugadorActual = new Jugador();

        
  contenedorEscena.querySelector('#botonContinuar').addEventListener('click', () => {
    cambiarEscena(2);
  });

  app.append(contenedorEscena);
}

/**
 * Escena 2: Interfaz del mercado y selección de productos.
 */
function escenaMercado() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena2";
  contenedorEscena.innerHTML = `
        <div class="cabeceraMercado">
            <h2 id="nombreMercado">Mercado Negro</h2>
            <p>Dinero = ${jugadorActual.dinero}
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

  const contenedorCarrito = document.createElement('div');
  contenedorCarrito.className = "contenedor-carrito";
  contenedorEscena.appendChild(contenedorCarrito);

  mercado.productos.forEach((productoActual, indiceProducto) => {
    const descuentoActual = descuentosPorRareza[productoActual.rareza];
    productoActual.aplicarDescuento(descuentoActual);

    const tarjetaProductoDiv = document.createElement('div');
    tarjetaProductoDiv.className = "producto";
    tarjetaProductoDiv.id = `card-${indiceProducto}`;
    tarjetaProductoDiv.innerHTML = `
            <img src="${productoActual.imagenURL}" alt="${productoActual.nombre}">
            <p>${productoActual.presentar()}</p>
            <button class="add-to-cart" id="botonSeleccionarProducto${indiceProducto}">
                <span>${productosSeleccionados.has(productoActual) ? "Retirar" : "Añadir"}</span>
            </button>
        `;
        
    const boton = tarjetaProductoDiv.querySelector(`#botonSeleccionarProducto${indiceProducto}`);
    boton.addEventListener('click', () => {
      if (productosSeleccionados.has(productoActual)) {
        
        productosSeleccionados.delete(productoActual);
        tarjetaProductoDiv.classList.remove('seleccionado');

        const imgEnCarrito = contenedorCarrito.querySelector(`img[data-id='${indiceProducto}']`);
        if (imgEnCarrito) imgEnCarrito.remove();

      } else {

        productosSeleccionados.add(productoActual);
        tarjetaProductoDiv.classList.add('seleccionado');

        const imgDentroBoton = tarjetaProductoDiv.querySelector('img');
        const imgAnim = imgDentroBoton.cloneNode(true);
        const rectImg = imgDentroBoton.getBoundingClientRect();
        imgAnim.style.position = 'absolute';
        imgAnim.style.left = `${rectImg.left}px`;
        imgAnim.style.top = `${rectImg.top}px`;
        imgAnim.style.width = `${rectImg.width}px`;
        imgAnim.style.height = `${rectImg.height}px`;
        imgAnim.style.zIndex = 1000;
        document.body.appendChild(imgAnim);

        const rectCarrito = contenedorCarrito.getBoundingClientRect();
        const carritoCentroX = rectCarrito.left + rectCarrito.width / 2 - rectImg.width / 2;
        const carritoCentroY = rectCarrito.top + rectCarrito.height / 2 - rectImg.height / 2;

        const deltaX = carritoCentroX - rectImg.left;
        const deltaY = carritoCentroY - rectImg.top;

        const anim = imgAnim.animate(
          [
            {
              transform: "translate(0, 0) scale(1)"
            },
            {
              transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2)`
            }
          ],
          {
            duration: 800,
            easing: "cubic-bezier(0.42, 0, 0.58, 1)",
            fill: "forwards"
          }
        );

        anim.onfinish = () => imgAnim.remove();


        const imgEnCarrito = document.createElement('img');
        imgEnCarrito.src = productoActual.imagenURL;
        imgEnCarrito.dataset.id = indiceProducto;
        imgEnCarrito.className = "imagencarrito";
        contenedorCarrito.appendChild(imgEnCarrito);
      }
    });


    contenedorProductos.appendChild(tarjetaProductoDiv);
  });

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

/**
 * Escena 3: Estado actual del jugador, mostrando estadísitcas e inventario.
 */
function escenaEstadoJugador() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena3";

  contenedorEscena.innerHTML = `
    <div class="cabeceraJugador">
      <h2 class="nombreJugador">${jugadorActual.nombre}</h2>
      <div class="imgJugador">
        <img src="./Imagenes/imgJugador.png">
      </div>
    </div>

    <div class="caracteristicas">
      <p class="ataque">Ataque: ${jugadorActual.ataqueTotal}</p>
      <p class="defensa">Defensa: ${jugadorActual.defensaTotal}</p>
      <p class="vida">Vida: ${jugadorActual.vida}</p>
      <p class="puntos">Puntos: ${jugadorActual.puntos}</p>
    </div>

    <div class="contenedor-carrito"></div>

    <div class="boton">
      <button id="botonContinuarEscena4">Continuar</button>
    </div>
  `;

  const contenedorCarrito = contenedorEscena.querySelector('.contenedor-carrito');

  jugadorActual.inventario.forEach((objeto, indice) => {
    const img = document.createElement('img');
    img.src = objeto.imagenURL;
    img.className = "imagencarrito";
    img.dataset.id = indice;
    contenedorCarrito.appendChild(img);
  });

  contenedorEscena
    .querySelector('#botonContinuarEscena4')
    .addEventListener('click', () => cambiarEscena(4));

  app.append(contenedorEscena);
}

/**
 * Escena 4: Mostrar los enemigos disponibles para las batallas.
 */
function escenaMostrarEnemigos() {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena4";
  contenedorEscena.innerHTML = `
    <div class="cabeceraEnemigos">
      <h2 class="nombreEnemigos">Enemigos Disponibles</h2>
    </div>
  `;

  /**
   * Lista de enemigos disponibles para las batallas.
   * @type {Enemigo[]}
   */
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


  contenedorEscena.appendChild(contenedorEnemigos);

  const contenedorBtnBatalla = document.createElement('div');
  contenedorBtnBatalla.className = "contenedorBtnBatalla";

  const botonIniciarBatallas = document.createElement('button');
  botonIniciarBatallas.className = "btnBatalla";
  botonIniciarBatallas.textContent = "Iniciar batallas";

  botonIniciarBatallas.addEventListener('click', () => cambiarEscena(5));

  contenedorBtnBatalla.appendChild(botonIniciarBatallas);

  contenedorEscena.appendChild(contenedorBtnBatalla);

  app.appendChild(contenedorEscena);
}

/**
 * Escena 5: Secuencia de batallas entre el jugador y los enemigos.
 */
function escenaBatallas() {
  app.innerHTML = "";

  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escenaBatallas";

  const enemigoActual = listaEnemigos[indiceBatallaActual];


  const titulo = document.createElement('div');
  titulo.className = "cabeceraBatallas";
  titulo.innerHTML = `<h2 class=cabeceraBatallas>Batalla contra ${enemigoActual.nombre}</h2>`;
  contenedorEscena.appendChild(titulo);

  const contenedorBatalla = document.createElement('div');
  contenedorBatalla.className = "contenedorBatalla";

  const contenedorImagenes = document.createElement('div');
  contenedorImagenes.className = "contenedorImagenesBatalla";

  const imgJugador = document.createElement('img');
  imgJugador.src = "./Imagenes/imgGuerrera.svg";
  imgJugador.alt = jugadorActual.nombre;
  imgJugador.className = "imgBatalla";

  const imgEnemigo = document.createElement('img');
  imgEnemigo.src = enemigoActual.imagen;
  imgEnemigo.alt = enemigoActual.nombre;
  imgEnemigo.className = "imgBatalla";

  const vs = document.createElement('span');
  vs.textContent = "VS";
  vs.className = "vsTexto";

  contenedorImagenes.appendChild(imgJugador);
  contenedorImagenes.appendChild(vs);

  contenedorImagenes.appendChild(imgEnemigo);
  contenedorBatalla.appendChild(contenedorImagenes);

  imgJugador.animate(
    [
      { transform: "translateX(-300px)" },
      { transform: "translateX(0)" }
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.17, 0.67, 0.83, 0.67)",
      fill: "forwards"
    }
  );

  imgEnemigo.animate(
    [
      { transform: "translateX(300px)" },
      { transform: "translateX(0)" }
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.17, 0.67, 0.83, 0.67)",
      fill: "forwards"
    }
  );

  const resultado = Batalla(enemigoActual, jugadorActual);
  const resultadoTexto = document.createElement('p');
  if (resultado.ganador === "jugador") {
    resultadoTexto.innerHTML = `Ganador: <strong>${jugadorActual.nombre}</strong><br>Puntos ganados: ${resultado.puntos}`;
  } else {
    resultadoTexto.innerHTML = `Ganador: <strong>${enemigoActual.nombre}</strong>`;
  }
  resultadoTexto.className = "resultadoBatalla";
  contenedorBatalla.appendChild(resultadoTexto);

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
        escenaBatallas();
      } else {
        cambiarEscena(6, false);
      }
    });
  }

  contenedorBatalla.appendChild(botonSiguiente);

  contenedorEscena.appendChild(contenedorBatalla);

  app.appendChild(contenedorEscena);
}

/**
 * Escena 6: Resultado final del juego, mostrando puntos y clasificación.
 * @param {boolean} jugadorMurio - Indica si el jugador murió durante las batallas.
 * @param {Enemigo|null} [ultimoEnemigo == null] - Último enemigo enfrentado.
 */
function escenaResultadoFinal(jugadorMurio = false, ultimoEnemigo = null) {
  const contenedorEscena = document.createElement('div');
  contenedorEscena.className = "escena6";

  const nivelJugadorFinal = jugadorMurio ? "Novato" : (jugadorActual.puntos >= 50 ? "Veterano" : "Novato");

  contenedorEscena.innerHTML = `
    <div class="cabeceraFinal">
      <h2 class="nombreCabecera">Resultado Final</h2>
    </div>
    <div class="contenedorFinal">
      <p>${jugadorActual.nombre} ha logrado ser un <strong>${nivelJugadorFinal}</strong></p>
      <p>Puntos totales: ${jugadorActual.puntos}</p>
      <button id="botonReiniciarJuego">Reiniciar</button>
    </div>
  `;

  contenedorEscena.querySelector('#botonReiniciarJuego')
    .addEventListener('click', () => location.reload());

  app.appendChild(contenedorEscena);

  if (nivelJugadorFinal === "Veterano") {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
}

/**
 * Inicializa la aplicación mostrando la primera escena.
 */
cambiarEscena(1);