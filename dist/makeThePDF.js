let buttonPDF = document.querySelectorAll('.genPDF')

let formPDF = document.querySelector('.pdf-form')

console.log(buttonPDF)


  buttonPDF.forEach(btn => { btn.addEventListener("click", function(e){
    e.preventDefault();
    showForm(btn.dataset.donnee)
  })})

  // Création de variable pour stocker les données de la configuration stockée dans le bouton
  // let donnees = document.querySelector('.genPDF').dataset.donnee;

  // Conversion des données en tableau JS


  // let tableau = JSON.parse(donnees);




  // Affiche le formulaire à remplir pour compléter le devis.
  function showForm(dataJSON) {
    let divForm = document.querySelector(".pdf-form");
    divForm.style.display = "block";

    let closeForm = document.querySelector(".close-icon");
    closeForm.addEventListener('click', function(){
    // Masque le formulaire au click sur la croix
      divForm.style.display= "none";
    } )

    // console.log(dataJSON)
    // let tableau = JSON.parse(dataJSON);
    // console.log(tableau)
  
    divForm.addEventListener("submit", function(e) {
      e.preventDefault();
  
      let nomSociete = document.getElementById("nomSociete").value;
      let telSociete = document.getElementById("telSociete").value;
      let mailSociete = document.getElementById("mailSociete").value;
      let nomEvenement = document.getElementById("nomEvenement").value;
      let dateEvenement = document.getElementById("dateEvenement").value;
      makePDF(nomSociete, telSociete, mailSociete, nomEvenement, dateEvenement, dataJSON);
    });
  }

function makePDF(nomSociete, telSociete, mailSociete, nomEvenement, dateEvenement, dataJSON){


  let divForm = document.querySelector(".pdf-form");
  divForm.style.display = "none";

  // objet Date qui servira à avoir à jour la date à laquelle à été crée le PDF 
  let date = new Date();

  // Récupération du jour, du mois et de l'année
  let jour = date.getDate();
  let mois = date.getMonth() + 1;
  let annee = date.getFullYear();

  let dataIG = InfosDevisIG.dataIG

  // Ici on importe les donénes extraites en PHP
  // Que l'on à convertie à l'aide de la fonction JSON
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200); 
    // 4 signifie que l'on attends que les 4 étapes ont bien étés passées
    // 200  signifie que la requête s'est bien passée
      dataIG = JSON.parse(this.responseText);
  }

  let tableau = JSON.parse(dataJSON);

  // Création d'un fichier pdf grâce à la methode 'jsPDF'
  let pdf = new jsPDF({
    orientation: 'portrait', // Orientation du fichier PDF en format portrait 
    unit: 'pt', // défini les unités de mesures sur 'point typographiques 
    allowTaint: true, // autorise html2canvas à extraire les données de l'imag
    format: "a4", // taille du fichier PDF sur Format A4
  });

  // pdf.setFont("arial"); // Police de caractères
  pdf.setFontSize(20); // Taille du texte définie précédement en 'pt'
  pdf.setTextColor(100);  // Couleur du texte

  // pdf.addImage(dataIG.logo_PDF, 'PNG', 50, 40 ,150, 60 )  // Création d'un rectangle 
  pdf.text(dataIG.nom_societe_PDF, 50, 70 );  // Création d'un rectangle 

  pdf.setFontSize(10); // Taille du texte définie précédement en 'pt'
  pdf.text(dataIG.rue_PDF, 50, 82); // pdf.text permet d'ajouter du texte
  pdf.text(dataIG.code_postal_PDF  ,50, 94); pdf.text(dataIG.ville_PDF,82, 94);
  pdf.text(`Téléphone: ` + dataIG.tel_PDF, 50, 106);
  pdf.text(`Email: ` + dataIG.email_PDF , 50, 118);

  // Les informations clients ici 
  pdf.setFontSize(12);
  pdf.setFontType('bold'); // cahnge la font-weight de la police de caractère
  pdf.text('DEVIS', 380, 84);
  pdf.setFontType('normal');
  pdf.setFontSize(10);
  pdf.text(`Date: ${jour}/${mois}/${annee}`,380, 96);
  pdf.setFontSize(12);
  pdf.setFontType('bold');
  pdf.text('Entreprise : ' + nomSociete ,380, 110);
  pdf.setFontSize(10);
  pdf.setFontType('normal')
  pdf.text('Téléphone : ' + telSociete ,380, 122);
  pdf.text('Adresse email : ' + mailSociete,380, 134);

  // Informations évènements 
  pdf.setFontType('bold');
  pdf.text('Évènement:', 50, 225);
  pdf.setFontType('normal');
  pdf.text(nomEvenement, 110, 225);
  pdf.setFontType('bold');
  pdf.text('Date: ', 50, 237);
  pdf.setFontType('normal');
  pdf.text(dateEvenement, 80, 237);

  // Construction du tableau ici
  let col1Width = 300; // Taille de la colonne 'Libellé"
  let rowHeight = 12; // Hauteur de la ligne
  let tableX = 100; // Position horizontale du tableau
  let tableY = 250; // Position verticale du tableau

  // Définition de l'emplacement du tableau
  pdf.rect(tableX, tableY, 350, rowHeight + 2); // Rectangle pour encadrer le tableau, 300 détermine la taille du tableau
  pdf.line(tableX + col1Width, tableY, tableX + col1Width, tableY + rowHeight +2); // Ligne verticale pour séparer les colonnes

  // Il est aux coordonnées horizontales de : TableX  + 10,   
  // et aux coordonénes vertivcales  de tableY + 11
  pdf.setFontType('bold');
  pdf.text('Libellé', tableX + 7, tableY + 11);

  // Il est aux coordonnées horizontales de : TableX + on lui rajoute la taille de col1Width(car il se trouve dans la deunième colonne)+ 10,   
  // et aux coordonénes vertivcales  de tableY + 11
  pdf.text('Quantité', tableX + col1Width + 4, tableY + 11); 

  let ligne = tableY + rowHeight * 2; // Position verticale de la première ligne de données

  console.log(tableau)

  for (let categorie in tableau) {
    let categorieArray = tableau[categorie]; // On définie une variable pour les catégorie présente dans le talbeau
    if (categorieArray != 0){  // Itère sur la catégorie si elle n'est pas vide
      pdf.setFontType('bold'); // Catégorie en gras pour bien différencier la catégire
      pdf.text(categorie, tableX + 7, ligne); // Écriture du nom de la catégorie

      ligne += rowHeight; // Passage à la ligne suivante

      for (let cle in tableau[categorie]) {
        let valeur = tableau[categorie][cle];

        if (valeur !== 0) { // Vérification si la valeur est différente de zéro
          pdf.setFontType('normal');
          pdf.text(cle, tableX + 10, ligne);
          pdf.text(valeur.toString(), tableX + col1Width + 10, ligne);

          ligne += rowHeight; // Passage à la ligne suivante
        }
      }
      console.log(tableau)

      ligne += rowHeight; // Espace entre les catégories
    }
  }



  pdf.setFontType('bold');
  pdf.text('Devis non contractuel',248, 725 );
  pdf.text('Merci de joindre ce document lors de votre prise de contact avec IGEXPO.', 123, 740 )


  pdf.setFontType('normal');
  //  On positionne le footer de la page, avec toutes les informations 
  pdf.text( 'Cube2Bois' + ' - ' + dataIG.rue_PDF + '  '  + dataIG.code_postal_PDF + ' ' 
            + dataIG.ville_PDF + ' - ' + 'Tél. : ' + dataIG.tel_PDF + ' - '
            + 'Email : ' + dataIG.email_footer_PDF, 70,810)
  pdf.text( 'Code NAF ' + dataIG.naf_PDF + ' - ' + 'SARL au capital sociel de ' + dataIG.sarl_PDF + '€' + ' ' 
            + ' - ' + 'SIRET :' + dataIG.siret_PDF + ' - ' + 'N°TVA ' + dataIG.tva_PDF, 50, 820)

  let pdfBlob = pdf.output('blob');
  let pdfURL = URL.createObjectURL(pdfBlob);

  
  //  Ouverture du fichier pdf dans un nouvel onglet
  window.open(pdfURL, '_blank');

  location.reload();



  // Update un champ ACF 
  // fetch(`${InfosDevisIG.root_url}/wp-json/wp/v2/config/${idconfig}`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     acf: {devis_pdf: pdfURL}
  //   }),
  //   headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': InfosDevisIG.nonce }
  // })
  // // console.log(InfosDevisIG.nonce);
  // .then(function(response) {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log(data);
  // })
  // .catch(function(error) {
  //   console.error(error);
  // });
}