import { umbral } from './constants/constants.js';

/**
 * Clasifica a un jugador según sus puntos.
 * @param {Jugador} jugador - Instancia del jugador a clasificar.
 * @param {number} [umbral = umbral] - Cantidad de puntos mínima para ser considerado "Veterano".
 * @returns {string} Devuelve "Veterano" si los puntos del jugador son mayores o iguales al umbral, o "Novato" en caso contrario.
 */
export function clasificarJugador(jugador, umbral = umbral){
    if(jugador.puntos >= umbral){
        return "Veterano"
    }else{
        return "Novato"
    }
}