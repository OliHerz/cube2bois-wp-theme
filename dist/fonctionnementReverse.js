// Récupérer toutes les balises "article" avec la classe "articleInfo"
const articles = document.querySelectorAll('article.articleInfo');

// Parcourir tous les articles et ajouter la classe "row" ou "row-reverse" en alternance
for (let i = 0; i < articles.length; i++) {
  const flexDirection = i % 2 === 0 ? 'row' : 'row-reverse';
  articles[i].querySelector('.contentArticle').style.flexDirection = flexDirection;
}
