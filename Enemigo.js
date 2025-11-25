import { vidaMax } from './constants/constants.js';

export class Enemigo {
    constructor(nombre, avatar, nivelAtaque, vidaMax){
        this.nombre = nombre;
        this.avatar = avatar;
        this.nivelAtaque = nivelAtaque;
        this.vidaMax = vidaMax;
        this.vida = this.vidaMax;
    }
}