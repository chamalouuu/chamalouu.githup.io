let leaves = [];
let currentPage = 1;

// Fonction setup pour p5.js
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('main-container'); // Attache le canvas au conteneur
    canvas.style('z-index', '1'); // Définit le canvas derrière les autres éléments
    canvas.style('position', 'fixed');
    canvas.style('pointer-events', 'none');
    canvas.style('top', '0px');
    canvas.style('left', '0px');
    createLeaves();
    showPage(currentPage);
}

// Fonction pour créer des feuilles
function createLeaves() {
    leaves = [];
    for (let i = 0; i < 2000; i++) {
        leaves.push({
            x: random(width),
            y: random(height),
            size: random(60, 120),
            removed: false
        });
    }

}

// Fonction draw pour p5.js
function draw() {
    clear(); // Efface le canvas pour chaque frame

    // Dessiner les feuilles
    for (let leaf of leaves) {
        if (!leaf.removed) {
            noStroke();
            fill(0, 255,0); // Couleur verte
            ellipse(leaf.x, leaf.y, leaf.size, leaf.size-50);
        }
    }
}

// Interaction pour "enlever" les feuilles
function mouseDragged() {
    for (let leaf of leaves) {
        let d = dist(mouseX, mouseY, leaf.x, leaf.y);
        if (d < leaf.size / 2) {
            leaf.removed = true; // Cache la feuille
        }
    }
    // Vérifie si toutes les feuilles sont enlevées
    if (leaves.every(leaf => leaf.removed)) {
        revealTextAndArrow();
    }
}

// Fonction pour révéler le texte et la flèche
function revealTextAndArrow() {
    let text = document.querySelector(`#page${currentPage} .hidden-text`);
    let arrow = document.querySelector(`#page${currentPage} .arrow`);
    if (text && arrow) {
        text.style.opacity = '1'; // Affiche le texte
        arrow.style.display = 'block'; // Affiche la flèche
    }
}

// Fonction pour afficher une page spécifique
function showPage(pageNumber) {
    let allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.style.display = 'none'); // Cache toutes les pages
    let current = document.querySelector(`#page${pageNumber}`);
    if (current) {
        current.style.display = 'block'; // Affiche la page courante
        createLeaves(); // Crée les feuilles pour cette page
    }
}

// Fonction pour aller à la page suivante
function goToNextPage(nextPage) {
    currentPage = nextPage;
    showPage(currentPage);
}
