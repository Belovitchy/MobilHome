const popupMessage = document.querySelector(".popupMessage");
const btnFermer = document.getElementById("fermer");
btnFermer.addEventListener("click", () => {
  popupMessage.style.display = "none";
});

// ajouter un event listener aux boutons message locataire du mois
//pour envoyer fichier xls a patrick avec tout les locataires du mois
const btnMessageLocMois = document.querySelectorAll(".save");
for (let i = 0; i < btnMessageLocMois.length; i++) {
  btnMessageLocMois[i].addEventListener("click", function (event) {
    //recuperer l'id du bouton clické
    const idBouton = event.currentTarget.id;
    //recup le mois en fonction de idBouton avec un switch
    let parentCard;
    switch (idBouton) {
      case "marsXLS":
        const listIdMars = [];
        parentCard = document.getElementById("cardsMars");
        for (let child of parentCard.children) {
          listIdMars.push(child.id);
        }
        console.log(listIdMars);
        break;
      case "saveAvril":
        mois = "avril";
        break;
      case "saveMai":
        mois = "mai";
        break;
      case "saveJuin":
        mois = "juin";
        break;
      case "saveJuillet":
        mois = "juillet";
        break;
      case "saveAout":
        mois = "aout";
        break;
      case "saveSeptembre":
        mois = "septembre";
        break;
      case "saveOctobre":
        mois = "octobre";
        break;
      case "saveNovembre":
        mois = "novembre";
        break;
    }

    popupMessage.style.display = "block";
  });
}
