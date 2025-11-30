
/**
 * Representa un producto disponible en el mercado
 */
export class Producto {
    /**
     * Crea una instancia de Producto.
     * @param {string} nombre - Nombre del producto.
     * @param {string} imagen - Ruta de la imagen del producto.
     * @param {number} precio - Precio base del producto en céntimos.
     * @param {string} rareza - Rareza del prodcuto ("común", "raro", "legendario")
     * @param {string} tipo - Tipo de producto ("arma", "armadura", "consumible")
     * @param {Object} bonus - Objeto que obtiene los bonus que aporta el producto.
     */
    constructor(nombre, imagen, precio, rareza, tipo, bonus) {
        this.nombre = nombre
         this.imagenURL = imagen;
        this.precio = precio
        this.rareza = rareza
        this.tipo = tipo
        this.bonus = bonus
        this.precioConDescuento = precio
    }

    /**
     * Devuelve el precio actual formateado en euros.
     * @returns {string} Precio del producto con formato "XX.XX€"
     */
    get precioFormateado() {
        return (this.precioConDescuento / 100).toFixed(2) + "€";
    }

    /**
     * Aplica un descuento al producto.
     * @param {number} porcentaje - Porcentaje de descuento a aplicar. 
     * @returns {Producto} La instancia del producto con el precio actualizado.
     */
    aplicarDescuento(porcentaje) {
        this.precioConDescuento = Math.round(this.precio * (1 - porcentaje / 100));
        return this;
    }

    /**
     * Devuelve una representación del producto.
     * @returns {string} Información del producto incluyendo nombre, precio formateado y rareza.
     */
    presentar() {
        return `${this.nombre} <br> Precio: ${this.precioFormateado} <br> Rareza: ${this.rareza}`;
    }
}