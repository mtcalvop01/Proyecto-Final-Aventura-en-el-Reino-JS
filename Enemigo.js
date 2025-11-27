// Enemigo.js
export class Enemigo {
    constructor(nombre, imagen, tipo = "Enemigo", nivelAtaque, vidaMax){
        this.nombre = nombre;
        this.imagen = imagen;
        this.tipo = tipo;        // tipo visible en la escena
        this.ataque = nivelAtaque; // renombramos para que sea consistente
        this.vidaMax = vidaMax;
        this.vida = this.vidaMax;
    }
}

