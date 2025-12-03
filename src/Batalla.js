/**
 * Ejecuta una batalla por turnos entre un enemigo y el jugador.
 * 
 * El jugador ataca primero. Si el enemigo sobrevive, contraataca.
 * El combate continúa hasta que uno de los dos llegue a 0 de vida.
 * 
 * @param {Object} enemigo - Objeto que representa al enemigo de la batalla.
 * @param {Object} jugador - Objeto que representa al jugador que participa en la batalla.
 * @returns {Object} Objeto con el ganador, los puntos obtenidos y si el jugador murió.
 */


export function Batalla(enemigo, jugador) {
    const ataqueJugador = jugador.ataqueTotal;
    const defensaJugador = jugador.defensaTotal;

    let puntosGanados = 0;
    let ganador = null;
    let jugadorMurio = false;

    while (jugador.vida > 0 && enemigo.vida > 0) {
        enemigo.vida -= ataqueJugador;
        if (enemigo.vida < 0) enemigo.vida = 0;

        if (enemigo.vida === 0) {
            ganador = "jugador";
        }

        if (enemigo.vida > 0) {
            let danioRecibido = (enemigo.ataque || 0) - defensaJugador;
            if (enemigo.multiplicadorDanio) danioRecibido *= enemigo.multiplicadorDanio;
            if (danioRecibido < 0) danioRecibido = 0;

            jugador.vida -= danioRecibido;
            if (jugador.vida <= 0) {
                jugador.vida = 0;
                ganador = "enemigo";
                jugadorMurio = true;
                jugador.puntos = 0; 
            }
        }

    }

    if (ganador === "jugador") {
        puntosGanados = 100 + (enemigo.ataque || 0);
        if (enemigo.multiplicadorDanio) puntosGanados *= enemigo.multiplicadorDanio;
        jugador.sumarPuntos(puntosGanados);
    }

    return {
        ganador,
        puntos: puntosGanados,
        jugadorMurio
    };
}


