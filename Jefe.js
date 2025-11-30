import { Enemigo } from './Enemigo.js';
import { multiplicadorDanio, vidaMax } from './constants/constants.js';


/**
 * Representa a un jefe (enemigo avanzado) en el juego.
 * Extiende de la clase Enemigo.
 * 
 * @param {string} nombre - Nombre del jefe.
 * @param {string} imagen - Ruta de la imagen del jefe.
 * @param {number} nivelAtaque - Nivel de ataque del jefe.
 * @param {number} vidaMaxParam - Vida máxima del jefe.
 * @param {string} habilidad - Habilidad especial del jefe.
 * @param {number} multiplicadorDanioParam - Multiplicador de daño del jefe.
 */
export class Jefe extends Enemigo {
    constructor(nombre, imagen, nivelAtaque, vidaMaxParam = vidaMax, habilidad = "Especial", multiplicadorDanioParam = multiplicadorDanio) {
        super(nombre, imagen, "Jefe", nivelAtaque, vidaMaxParam); // tipo = "Jefe"
        this.habilidad = habilidad;
        this.multiplicadorDanio = multiplicadorDanioParam;
    }
}