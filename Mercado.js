import { Producto } from "./Producto.js";

export class Mercado {
    constructor(productos) {
        this.productos = productos;
    }

    filtrarPorRareza(rarezaBuscada) {
        let resultado = [];
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].rareza === rarezaBuscada) {
                resultado.push(this.productos[i]);
            }
        }
        return resultado;
    }
}

const mercadoArray = [
    new Producto("Espada de Hierro", 1200, "común", "arma", { ataque: 5 }),
    new Producto("Armadura de Cuero", 950, "común", "armadura", { defensa: 3 }),
    new Producto("Poción de Vida", 500, "común", "consumible", { curacion: 20 }),
    new Producto("Espada de Fuego", 2500, "raro", "arma", { ataque: 12 }),
    new Producto("Escudo del Dragón", 2800, "raro", "armadura", { defensa: 10 }),
    new Producto("Espada Legendaria", 5500, "legendario", "arma", { ataque: 25 }),
    new Producto("Armadura Sagrada", 5000, "legendario", "armadura", { defensa: 20 })
];

const mercadoObj = new Mercado(mercadoArray);

