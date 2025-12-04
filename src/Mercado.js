import { Producto } from "./Producto.js";


/**
 * Representa un mercado que contiene productos.
 */
export class Mercado {
    /**
     * Crea una instancia de Mercado.
     * @param {Producto[]} productos - Array de objetos Producto disponilbles en el mercado. 
     */
    constructor(productos) {
        this.productos = productos;
    }

    /**
     * Filtra los productos del mercado por rareza.
     * @param {string} rarezaBuscada - Rareza pro la que se desea filtrar ("común", "raro", "legendario") 
     * @returns {Producto[]} Array de prodcutos qeu coinciden con la rareza indicada. 
     */
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

/**
 * Array de productos predeterminados disponibles en el mercado.
 * @type {Producto[]}
 */
const mercadoArray = [
    new Producto("Espada de Hierro", "./Imagenes/espada_hierro.svg", 5000, "común", "arma", { ataque: 5 }),
    new Producto("Armadura de Cuero", "./Imagenes/armadura.svg", 5000, "común", "armadura", { defensa: 3 }),
    new Producto("Poción de Vida", "./Imagenes/pocion_vida.svg", 5000, "común", "consumible", { curacion: 20 }),
    new Producto("Cuchillo de la Muerte", "./Imagenes/cuchillo.svg", 5000, "raro", "arma", { ataque: 12 }),
    new Producto("Escudo del Dragón", "./Imagenes/escudo_dragon.svg", 5000, "raro", "armadura", { defensa: 10 }),
    new Producto("Espada Legendaria", "./Imagenes/espada_legendaria.svg", 5000, "legendario", "arma", { ataque: 25 }),
    new Producto("Armadura Sagrada", "./Imagenes/armadura_sagrada.svg", 5000, "legendario", "armadura", { defensa: 20 }),
    new Producto("Anillo de Mana", "./Imagenes/anillo.svg", 5000, "raro", "accesorio", { mana: 30 }),      
    new Producto("Botas del Veloz", "./Imagenes/botas.svg", 10000, "común", "armadura", { velocidad: 5 })
];

/**
 * Instancia predeterminada del mercado con productos iniciales.
 * @type {Mercado}
 */
export const mercado = new Mercado(mercadoArray);

