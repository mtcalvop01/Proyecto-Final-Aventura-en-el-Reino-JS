/**
 * Representa a un enemigo en el juego.
 * 
 * @param {string} nombre - Nombre del enemigo.
 * @param {string} imagen - Ruta de la imagen del enemigo.
 * @param {string} tipo - Indica el tipo del enemigo.
 * @param {number} nivelAtaque - Nivel de ataque del enemigo.
 * @param {number} vidaMax - Vida máxima del enemigo.
 */

export class Enemigo {
    constructor(nombre, imagen, tipo = "Enemigo", nivelAtaque, vidaMax){
        this.nombre = nombre;
        this.imagen = imagen;
        this.tipo = tipo;        
        this.ataque = nivelAtaque; 
        this.vidaMax = vidaMax;
        this.vida = this.vidaMax;
    }
}

