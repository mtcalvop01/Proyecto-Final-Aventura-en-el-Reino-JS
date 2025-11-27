import { Enemigo } from './Enemigo.js';
import { multiplicadorDanio, vidaMax } from './constants/constants.js';

export class Jefe extends Enemigo {
    constructor(nombre, imagen, nivelAtaque, vidaMaxParam = vidaMax, habilidad = "Especial", multiplicadorDanioParam = multiplicadorDanio) {
        super(nombre, imagen, "Jefe", nivelAtaque, vidaMaxParam); // tipo = "Jefe"
        this.habilidad = habilidad;
        this.multiplicadorDanio = multiplicadorDanioParam;
    }
}