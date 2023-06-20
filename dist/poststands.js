// Récupérer les éléments du DOM avec les IDs appropriés
const afficheDevisBtn = document.querySelector('.button-Devis');
const afficheStandsBtn = document.querySelector('.button-Stand');
const devisContent = document.querySelector('.devis-content');
const standContent = document.querySelector('.stand-content');

document.body.style.overflow = "hidden";


afficheStandsBtn.addEventListener('click', () => {
  // Si la div "devis-content" est affichée, afficher la div "stand-content"
  if (devisContent.style.display === 'flex') {
    standContent.style.display = 'flex';
    devisContent.style.display = 'none';

    // Enlever la classe "active" du bouton "mes-devis" et ajouter la classe "active" au bouton "mes-stands"
    afficheDevisBtn.classList.remove('active');
    afficheStandsBtn.classList.add('active');
  } else {
    // Sinon, afficher simplement la div "stand-content"
    standContent.style.display = 'flex';
    devisContent.style.display = 'none';

    // Ajouter la classe "active" au bouton "mes-stands" et enlever la classe "active" du bouton "mes-devis"
    afficheStandsBtn.classList.add('active');
    afficheDevisBtn.classList.remove('active');
  }
});

afficheDevisBtn.addEventListener('click', () => {
  // Si la div "stand-content" est affichée, afficher la div "devis-content"
  if (standContent.style.display === 'flex') {
    devisContent.style.display = 'flex';
    standContent.style.display = 'none';

    // Enlever la classe "active" du bouton "mes-stands" et ajouter la classe "active" au bouton "mes-devis"
    afficheStandsBtn.classList.remove('active');
    afficheDevisBtn.classList.add('active');
  } else {
    // Sinon, afficher simplement la div "devis-content"
    devisContent.style.display = 'flex';
    standContent.style.display = 'none';

    // Ajouter la classe "active" au bouton "mes-devis" et enlever la classe "active" du bouton "mes-stands"
    afficheDevisBtn.classList.add('active');
    afficheStandsBtn.classList.remove('active');
  }
});


