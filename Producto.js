export class Producto{
    constructor(nombre, imagen, precio, rareza, tipo, bonus){
        this.nombre = nombre
        this.imagen = imagen
        this.precio = precio
        this.rareza = rareza
        this.tipo = tipo
        this.bonus = bonus;
    }

    get precioFormateado(){
        return (this.precio / 100).toFixed(2) + "€";
    }

    aplicarDescuento(porcentaje){
        const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));
        return new Producto(this.nombre, this.imagen, nuevoPrecio, this.rareza, this.tipo, this.bonus);

    }
}