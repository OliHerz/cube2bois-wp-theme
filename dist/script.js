// Affichage du menu mobile

// On cible les éléments à modifier 
const hamburger = document.querySelector('.hamburger');
const navBar = document.querySelector('.navBar');
const body = document.documentElement ;
const navItem = document.querySelectorAll('.navItem')

function doToggle(){
  hamburger.classList.toggle('is-active');
  navBar.classList.toggle('navBar-active');
  body.classList.toggle('no-scroll');
};

function fermeMenu(){
  hamburger.classList.remove('is-active');
  navBar.classList.remove('navBar-active');
  body.classList.remove('no-scroll');
}

navItem.forEach(item =>{ item.addEventListener('click', fermeMenu)})

// La fonction est appellée au click sur l'icon du menu burger
hamburger.addEventListener('click', doToggle);