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


