
const tabelloneEl = document.getElementById('tabellone');
const celle = Array.from(document.querySelectorAll('.cella'));
const giocatoreEl = document.getElementById('giocatore');
const nuovaPartitaBtn = document.getElementById('nuovaPartitaBtn');
const pedine = Array.from(document.querySelectorAll('.pedina'));
// Stato del gioco
let tabellone = Array(9).fill(null);
let giocatoreCorrente = 'X';
let partitaFinita = false;

// Imposta colore iniziale del giocatore nello stato
giocatoreEl.classList.remove('x', 'o');
giocatoreEl.classList.add(giocatoreCorrente.toLowerCase());

// Combinazioni vincenti (righe, colonne, diagonali)
const combinazioniVittoria = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// Esegue una mossa nella cella indicata
function gestisciMossa(indice, cella) {
	if (partitaFinita) return;
	if (tabellone[indice] !== null) return; // Cella già giocata, non modificabile
	tabellone[indice] = giocatoreCorrente;
	cella.textContent = giocatoreCorrente;
	cella.classList.add('giocata', giocatoreCorrente.toLowerCase());

	if (verificaVittoria(giocatoreCorrente)) {
		partitaFinita = true;
		tabelloneEl.classList.add('finita');
		nuovaPartitaBtn.hidden = false;
		alert(`Ha vinto ${giocatoreCorrente}!`);
		return;
	}

	if (tabellone.every(function (valore) {
		return valore !== null;
	})) {
		partitaFinita = true;
		tabelloneEl.classList.add('finita');
		nuovaPartitaBtn.hidden = false;
		alert('Pareggio!');
		return;
	}

	if (giocatoreCorrente === 'X') {
        giocatoreCorrente = 'O';
    } else {
        giocatoreCorrente = 'X';
    }
	giocatoreEl.textContent = giocatoreCorrente;
	// Aggiorna il colore del simbolo nello stato in base al giocatore
	giocatoreEl.classList.remove('x', 'o');
	giocatoreEl.classList.add(giocatoreCorrente.toLowerCase());
	aggiornaPedine();
}

// Controlla se la mossa genera una vittoria
function verificaVittoria(giocatore) {
	return combinazioniVittoria.some(function (combinazione) {
		const a = combinazione[0];
		const b = combinazione[1];
		const c = combinazione[2];
		return tabellone[a] === giocatore && tabellone[b] === giocatore && tabellone[c] === giocatore;
	});
}


// Click mouse sulle celle
celle.forEach(function (cella) {
	const indice = parseInt(cella.getAttribute('data-index'));
	cella.addEventListener('click', function () {
		gestisciMossa(indice, cella);
	});
});

// Reset della partita
function resetPartita() {
	tabellone = Array(9).fill(null);
	giocatoreCorrente = 'X';
	partitaFinita = false;
	tabelloneEl.classList.remove('finita');

	celle.forEach(function (cella) {
		cella.textContent = '';
		cella.classList.remove('giocata', 'x', 'o');
	});

	giocatoreEl.textContent = giocatoreCorrente;
	giocatoreEl.classList.remove('x', 'o');
	giocatoreEl.classList.add('x');

	nuovaPartitaBtn.hidden = true;
}

// Click sul bottone Nuova Partita
nuovaPartitaBtn.addEventListener('click', resetPartita);



