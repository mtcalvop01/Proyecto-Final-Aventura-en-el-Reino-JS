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
        this.inventario.push(structuredClone(objeto));
    }

    sumarPuntos(cantidad) {
        this.puntos = this.puntos + cantidad;
    }

    get ataqueTotal() {
        let total = 0;
        for (let i = 0; i < this.inventario.length; i++) {
            let item = this.inventario[i];
            if(item.tipo === "Arma") total = total + item.bonus;
        }
        return total;
    }

    get defensaTotal() {
        let total = 0;
        for (let i = 0; i < this.inventario.length; i++) {
            let item = this.inventario[i];
            if(item.tipo === "Armadura") total = total + item.bonus;
        }
        return total;
    }

    inventarioPorTipo() {
        return groupBy(this.inventario, item => item.tipo);
    }

    get vidaTotal() {
        let total = this.vidaMax;
        for (let i = 0; i < this.inventario.length; i++) {
            let item = this.inventario[i];
            if(item.tipo === "Consumible") total = total + item.bonus;
        }
        return total;
    }
}