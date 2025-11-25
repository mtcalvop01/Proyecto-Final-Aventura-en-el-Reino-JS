export function Batalla(enemigo, jugador) {
    const ataqueJugador = jugador.ataqueTotal;
    const defensaJugador = jugador.defensaTotal;

    let puntosGanados = 0;
    let ganador = null;

    while (jugador.vida > 0 && enemigo.vida > 0) {
        enemigo.vida -= ataqueJugador;
        if (enemigo.vida < 0) enemigo.vida = 0;

        if (enemigo.vida === 0) {
            ganador = "jugador";
            break;
        }

        let danioRecibido = ataqueEnemigo(enemigo) - defensaJugador;
        if (danioRecibido < 0) danioRecibido = 0;

        jugador.vida -= danioRecibido;
        if (jugador.vida < 0) jugador.vida = 0;

        if (jugador.vida === 0) {
            ganador = "enemigo";
            break;
        }
    }

    if (ganador === "jugador") {
        puntosGanados = 100 + enemigo.nivelAtaque;

        if (enemigo.multiplicadorDanio) {
            puntosGanados *= enemigo.multiplicadorDanio;
        }

        jugador.sumarPuntos(puntosGanados);
    }

    return {
        ganador,
        puntos: puntosGanados
    };
}

function ataqueEnemigo(enemigo) {
    return enemigo.nivelAtaque;
}
