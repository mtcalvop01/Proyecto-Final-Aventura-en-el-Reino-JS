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

