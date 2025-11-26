export class Producto {
    constructor(nombre, imagen, precio, rareza, tipo, bonus) {
        this.nombre = nombre
        this.imagen = imagen
        this.precio = precio
        this.rareza = rareza
        this.tipo = tipo
        this.bonus = bonus
        this.precioConDescuento = precio
    }

    get precioFormateado() {
        return (this.precioConDescuento / 100).toFixed(2) + "€";
    }

    aplicarDescuento(porcentaje) {
        this.precioConDescuento = Math.round(this.precio * (1 - porcentaje / 100));
        return this;
    }


    presentar() {
        return `${this.nombre} - Precio: ${this.precioFormateado} - Rareza: ${this.rareza}`;
    }
}