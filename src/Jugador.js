import { groupBy } from './utils/utils.js';
import { vidaMax, puntos_base } from './constants/constants.js';

/**
 * Representa al jugador del juego.
 */
export class Jugador {
    /**
     * Crea una instancia de Jugador.
     * @param {string} nombre - Nombre del jugador.
     * @param {string} avatar - Ruta de la imagen del avatar del jugador.
     */
    constructor(nombre, avatar) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = puntos_base;
        this.vidaMax = 100;
        this.vida = vidaMax;
        this.inventario = [];
        this.dineroMax = 500;
        this.dinero = this.dineroMax;
    }

    /**
     * Añade un objeto al inventario del jugador.
     * @param {Object} objeto - Objeto a añadir al inventario
     */
    añadirObjeto(objeto) {
        this.inventario.push(objeto);
    }

    /**
     * Suma puntos al jugador.
     * @param {number} cantidad - Cantidad de puntos a añadir.
     */
    sumarPuntos(cantidad) {
        this.puntos = this.puntos + cantidad;
    }

    /**
     * Calcula el total de ataque del jugador según su inventario.
     * @type {number}
     */
    get ataqueTotal() {
        let total = 0;
        for (let i = 0; i < this.inventario.length; i++) {
            let item = this.inventario[i];
            if (item.tipo.toLowerCase() === "arma" && item.bonus.ataque) {
                total += item.bonus.ataque;
            }
        }
        return total;
    }

    /**
     * Calcula la defensa total del jugador según su inventario.
     * @type {number}
     */
    get defensaTotal() {
        let total = 0;
        for (let i = 0; i < this.inventario.length; i++) {
            let item = this.inventario[i];
            if (item.tipo.toLowerCase() === "armadura" && item.bonus.defensa) {
                total += item.bonus.defensa;
            }
        }
        return total;
    }

    /**
     * Calcula la vida total del jugador considerando consumibles del inventario.
     * @type {number}
     */
    get vidaTotal() {
        let total = this.vidaMax;
        for (let i = 0; i < this.inventario.length; i++) {
            let item = this.inventario[i];
            if (item.tipo.toLowerCase() === "consumible" && item.bonus.curacion) {
                total += item.bonus.curacion;
            }
        }
        return total;
    }

    /**
     * Agrupa los objetos del inventario por tipo.
     * @returns {Object} Objeto con arrays de inventario agrupados por tipo.
     */
    inventarioPorTipo() {
        return groupBy(this.inventario, item => item.tipo);
    }

    /**
     * Muestra la información resumida del jugador.
     * @returns {string} Información del jugador incluyendo nombre, vida, puntos, ataque e inventario.
     */
    mostrarJugador() {
        return `Nombre: ${this.nombre}\nVida: ${this.vida}\nPuntos: ${this.puntos}\nAtaque: ${this.ataqueTotal}\nInventario: ${this.inventario.map(p => p.nombre).join(', ')}\nDinero: ${this.dinero}`;
    }
}