import { groupBy } from './utils/utils.js';
import { vidaMax, puntos_base } from './constants/constants.js';

export class Jugador {
    constructor(nombre, avatar) {
        this.nombre = nombre;
        this.avatar = avatar;
        this.puntos = puntos_base;
        this.vidaMax = 100;
        this.vida = vidaMax;
        this.inventario = []
    }

    añadirObjeto(objeto) {
        this.inventario.push(objeto);
    }

    sumarPuntos(cantidad) {
        this.puntos = this.puntos + cantidad;
    }

get ataqueTotal() {
    let total = 0;
    for (let i = 0; i < this.inventario.length; i++) { // recorremos por índice
        let item = this.inventario[i];                // obtenemos el item actual
        if(item.tipo.toLowerCase() === "arma" && item.bonus.ataque) { 
            total += item.bonus.ataque;               // sumamos el bonus de ataque
        }
    }
    return total;
}

get defensaTotal() {
    let total = 0;
    for (let i = 0; i < this.inventario.length; i++) {
        let item = this.inventario[i];
        if(item.tipo.toLowerCase() === "armadura" && item.bonus.defensa) {
            total += item.bonus.defensa;
        }
    }
    return total;
}

get vidaTotal() {
    let total = this.vidaMax;
    for (let i = 0; i < this.inventario.length; i++) {
        let item = this.inventario[i];
        if(item.tipo.toLowerCase() === "consumible" && item.bonus.curacion) {
            total += item.bonus.curacion;
        }
    }
    return total;
}


inventarioPorTipo() {
    return groupBy(this.inventario, item => item.tipo);
}



    mostrarJugador() {
        return `Nombre: ${this.nombre}\nVida: ${this.vida}\nPuntos: ${this.puntos}\nAtaque: ${this.ataqueTotal}\nInventario: ${this.inventario.map(p => p.nombre).join(', ')}`;
    }
}