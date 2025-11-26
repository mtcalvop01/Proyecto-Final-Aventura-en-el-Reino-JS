import { Enemigo } from './Enemigo.js';
import { multiplicadorDanio, vidaMax } from './constants/constants.js';

export class Jefe extends Enemigo {
    constructor(nombre, nivelAtaque, vidaMaxParam = vidaMax, habilidad = "Especial", multiplicadorDanioParam = multiplicadorDanio) {
        super(nombre, "Jefe", nivelAtaque, vidaMaxParam); // tipo = "Jefe"
        this.habilidad = habilidad;
        this.multiplicadorDanio = multiplicadorDanioParam;
    }
}