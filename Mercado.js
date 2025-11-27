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
    new Producto("Espada de Hierro", "./Imagenes/espada_hierro.svg", 1200, "común", "arma", { ataque: 5 }),
    new Producto("Armadura de Cuero", "./Imagenes/armadura.svg", 950, "común", "armadura", { defensa: 3 }),
    new Producto("Poción de Vida", "./Imagenes/pocion_vida.svg", 500, "común", "consumible", { curacion: 20 }),
    new Producto("Cuchillo de la Muerte", "./Imagenes/cuchillo.svg", 2500, "raro", "arma", { ataque: 12 }),
    new Producto("Escudo del Dragón", "./Imagenes/escudo_dragon.svg", 2800, "raro", "armadura", { defensa: 10 }),
    new Producto("Espada Legendaria", "./Imagenes/espada_legendaria.svg", 5500, "legendario", "arma", { ataque: 25 }),
    new Producto("Armadura Sagrada", "./Imagenes/armadura_sagrada.svg", 5000, "legendario", "armadura", { defensa: 20 }),
    new Producto("Anillo de Mana", "./Imagenes/anillo.svg", 1500, "raro", "accesorio", { mana: 30 }),      
    new Producto("Botas del Veloz", "./Imagenes/botas.svg", 1800, "común", "armadura", { velocidad: 5 })
];

export const mercado = new Mercado(mercadoArray);

