import {Enemigo} from './Enemigo.js';
import { multiplicadorDanio, vidaMax } from './constants/constants.js';

export class Jefe extends Enemigo {
    constructor(nombre, avatar, nivelAtaque, vidaMaxParam = vidaMax, multiplicadorDanioParam = multiplicadorDanio) {
        super(nombre, avatar, nivelAtaque, vidaMaxParam);
        this.multiplicadorDanio = multiplicadorDanioParam;
    }
}
