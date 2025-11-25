import { umbral } from './constants/constants.js';

export function clasificarJugador(jugador, umbral = umbral){
    if(jugador.puntos >= umbral){
        return "Veterano"
    }else{
        return "Novato"
    }
}