
const tabelloneEl = document.getElementById('tabellone');
const celle = Array.from(document.querySelectorAll('.cella'));
const statoEl = document.getElementById('stato');
const giocatoreEl = document.getElementById('giocatore');
const esitoEl = document.getElementById('esito');
const nuovaPartitaBtn = document.getElementById('nuovaPartitaBtn');
const pedine = Array.from(document.querySelectorAll('.pedina'));
// Stato del gioco
let tabellone = Array(9).fill(null);
let giocatoreCorrente = 'X';
let partitaFinita = false;

// Imposta colore iniziale del giocatore nello stato
giocatoreEl.classList.remove('x', 'o');
giocatoreEl.classList.add(giocatoreCorrente.toLowerCase());
aggiornaPedine();
esitoEl.hidden = true;

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
		aggiornaPedine();
		statoEl.hidden = true;
		esitoEl.hidden = false;
		esitoEl.classList.remove('x', 'o');
		esitoEl.classList.add(giocatoreCorrente.toLowerCase());
		esitoEl.textContent = `Ha vinto ${giocatoreCorrente}!`;
		return;
	}

	if (tabellone.every(function (valore) {
		return valore !== null;
	})) {
		partitaFinita = true;
		tabelloneEl.classList.add('finita');
		nuovaPartitaBtn.hidden = false;
		aggiornaPedine();
		statoEl.hidden = true;
		esitoEl.hidden = false;
		esitoEl.classList.remove('x', 'o');
		esitoEl.textContent = 'Pareggio!';
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
	statoEl.hidden = false;
	esitoEl.hidden = true;
	esitoEl.classList.remove('x', 'o');
	esitoEl.textContent = '';
}

function aggiornaPedine() {
	pedine.forEach(function (pedina) {
		const simbolo = pedina.getAttribute('data-symbol');
		const attiva = !partitaFinita && simbolo === giocatoreCorrente;
		pedina.setAttribute('draggable', attiva ? 'true' : 'false');
		pedina.classList.toggle('disabilitata', !attiva);
	});
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


// Spostamento celle nel tabellone
celle.forEach(function (cella) {
	const indice = parseInt(cella.getAttribute('data-index'));
	cella.addEventListener('dragover', function (evento) {
		if (partitaFinita) return;
		if (tabellone[indice] !== null) return;
		evento.preventDefault();
		evento.dataTransfer.dropEffect = 'move';
	});

	cella.addEventListener('drop', function (evento) {
		evento.preventDefault();
		if (partitaFinita) return;
		if (tabellone[indice] !== null) return;
		const simbolo = evento.dataTransfer.getData('text/plain');
		if (simbolo !== giocatoreCorrente) return;
		gestisciMossa(indice, cella);
	});
});

// Drag sulle pedine
pedine.forEach(function (pedina) {
	pedina.addEventListener('dragstart', function (evento) {
		const simbolo = pedina.getAttribute('data-symbol');
		if (partitaFinita || simbolo !== giocatoreCorrente) {
			evento.preventDefault();
			return;
		}
		evento.dataTransfer.setData('text/plain', simbolo);
		evento.dataTransfer.effectAllowed = 'move';
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
	aggiornaPedine();
	statoEl.hidden = false;
	esitoEl.hidden = true;
	esitoEl.classList.remove('x', 'o');
	esitoEl.textContent = '';

	nuovaPartitaBtn.hidden = true;
}

// Click sul bottone Nuova Partita
nuovaPartitaBtn.addEventListener('click', resetPartita);



