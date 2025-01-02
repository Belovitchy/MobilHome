const mars = "mars";
const avril = "avril";
const mai = "mai";
const juin = "juin";
const juillet = "juillet";
const aout = "aout";
const septembre = "septembre";
const octobre = "octobre";
const novembre = "novembre";

const boutonQuitter = document.getElementById("quit");
const boutonSupp = document.getElementById("supp");
const boutonSave = document.getElementById("enr");

const allBouton = document.querySelectorAll(".addClient");
for (let i = 0; i < allBouton.length; i++) {
  allBouton[i].addEventListener("click", function (event) {
    //recuperer l'id du bouton clické
    const idBouton = event.target.id;
    // const year = document.getElementById("year").value;
    //recup le mois en fonction de idBouton avec un switch
    let mois;
    switch (idBouton) {
      case "addClientMars":
        mois = mars;
        break;
      case "addClientAvril":
        mois = avril;
        break;
      case "addClientMai":
        mois = mai;
        break;
      case "addClientJuin":
        mois = juin;
        break;
      case "addClientJuillet":
        mois = juillet;
        break;
      case "addClientAout":
        mois = aout;
        break;
      case "addClientSeptembre":
        mois = septembre;
        break;
      case "addClientOctobre":
        mois = octobre;
        break;
      case "addClientNovembre":
        mois = novembre;
        break;
    }
    popupCreer(mois);
  });
}

//prevoir de l'appeler au chargement d'annee
creerCardLocataire();
//----------------------------------------------------------
//creer un carte locataire
//----------------------------------------------------------
function popupCreer(mois) {
  const zoneTitre = document.getElementById("titrePopup");

  boutonSave.innerText = "Enregistrer";
  zoneTitre.innerText = "Ajouter locataire";
  const year = document.getElementById("year").value;
  const popup = document.querySelector(".popup");
  popup.style.display = "block";

  //vider les inputs
  const allInput = document.querySelectorAll(".dataLoc");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }

  function onClickEnr() {
    // ajouter toutes les securite zone pas reserve, nom etc...
    if (
      verifAnne(year) &&
      verifMois(mois) &&
      verifClient() &&
      verifDoublon() &&
      verifArriveAvantDepart()
    ) {
      enregistreLocataireMois(mois, year);
      //creerCardLocataire();
      const popup = document.querySelector(".popup");
      popup.style.display = "none";
      boutonQuitter.removeEventListener("click", onClickQuitter);
      boutonSupp.removeEventListener("click", onClickSupp);
      boutonSave.removeEventListener("click", onClickEnr);
      return;
    } else {
      //popupAlert("verifier les infos");
      console.log("popupcreer");
      // const popup = document.querySelector(".popup");
      // popup.style.display = "none";
      // boutonSave.removeEventListener("click", onClickEnr);
      return;
    }
  }

  function onClickQuitter() {
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
    boutonQuitter.removeEventListener("click", onClickQuitter);
    boutonSupp.removeEventListener("click", onClickSupp);
    boutonSave.removeEventListener("click", onClickEnr);
  }

  function onClickSupp() {
    const demiANettoyer = document.querySelectorAll(".demi");
    for (let i = 0; i < demiANettoyer.length; i++) {
      demiANettoyer[i].classList.remove("reserve");
    }
    const allInput = document.querySelectorAll(".dataLoc");
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = "";
    }
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
    boutonQuitter.removeEventListener("click", onClickQuitter);
    boutonSupp.removeEventListener("click", onClickSupp);
    boutonSave.removeEventListener("click", onClickEnr);
  }
  boutonSave.addEventListener("click", onClickEnr);
  boutonQuitter.addEventListener("click", onClickQuitter);
  boutonSupp.addEventListener("click", onClickSupp);
}
//---------------------------------------------------------------------------------------
//ici toutes les fonctions qui verifient toutes les conditions avant d'enregistrer
//---------------------------------------------------------------------------------------

//verifier que l'arrivee et bien avant le depart
function verifArriveAvantDepart() {
  const zoneArrivee = document.getElementById("arrive");
  const zoneDepart = document.getElementById("depart");
  const dateArrive = new Date(zoneArrivee.value);
  const dateDepart = new Date(zoneDepart.value);

  if (dateArrive >= dateDepart) {
    popupAlert("le départ est avant l'arrivée");

    return false;
  } else {
    console.log("l'arrive est avant depart");
    return true;
  }
}
//verifier l'annee
function verifAnne(year) {
  const zoneArrivee = document.getElementById("arrive");
  const anneClientArrive = zoneArrivee.value.split("-")[0];
  if (anneClientArrive != year) {
    popupAlert("L'année d'arrivee ne correspond pas a l'annee choisie");
    return false;
  } else {
    console.log("c'est la bonne annee");
    return true;
  }
}

//verifier le mois
function verifMois(mois) {
  const zoneArrivee = document.getElementById("arrive");
  const zoneDepart = document.getElementById("depart");
  const moisClientArrive = zoneArrivee.value.split("-")[1];
  const moisClientDepart = zoneDepart.value.split("-")[1];
  let moiAtest = "";
  switch (mois) {
    case mars:
      moiAtest = "03";
      break;
    case avril:
      moiAtest = "04";
      break;
    case mai:
      moiAtest = "05";
      break;
    case juin:
      moiAtest = "06";
      break;
    case juillet:
      moiAtest = "07";
      break;
    case aout:
      moiAtest = "08";
      break;
    case septembre:
      moiAtest = "09";
      break;
    case octobre:
      moiAtest = "10";
      break;
    case novembre:
      moiAtest = "11";
      break;
  }
  if (moisClientArrive != moiAtest && moisClientDepart != moiAtest) {
    console.log(moiAtest);
    console.log(moisClientArrive);
    popupAlert("Le mois ne correspondent pas");
    return false;
  } else {
    console.log("c'est le bon mois");
    return true;
  }
}

//verifier que arrivée depart et nom sont renseignées
function verifClient() {
  const zoneNom = document.getElementById("nom1");
  const zonePrenom = document.getElementById("prenom1");
  const zoneArrivee = document.getElementById("arrive");
  const zoneDepart = document.getElementById("depart");
  if (
    zoneArrivee.value == "" ||
    zoneDepart.value == "" ||
    zoneNom.value == "" ||
    zonePrenom.value == ""
  ) {
    popupAlert(
      "Veuillez renseigner les dates d'arrivee et de depart ainsi que le nom et le prénom du locataire"
    );
    return false;
  } else {
    console.log("les champs obligatoires sont ok");
    return true;
  }
}

//verifier qu'il n'y a pas de doublons

function verifDoublon() {
  const zoneArrivee = document.getElementById("arrive");
  const zoneDepart = document.getElementById("depart");
  const dateArrive = new Date(zoneArrivee.value);
  const dateDepart = new Date(zoneDepart.value);
  const dateArray = [];
  let date = new Date(dateArrive);
  date.setDate(date.getDate() + 1); //partir au jour d'apres
  while (date < dateDepart) {
    dateArray.push(date.toISOString().split("T")[0]);
    date.setDate(date.getDate() + 1);
  }
  const caseDateArrivee = document.getElementById(zoneArrivee.value);
  const caseDateDepart = document.getElementById(zoneDepart.value);

  //console.log(caseDateArrivee);
  //recupérer la div enfant qui a aprem comme class
  for (let child of caseDateArrivee.children) {
    if (
      child.classList.contains("aprem") &&
      child.classList.contains("reserve")
    ) {
      popupAlert("La date d'arrivée est déjà réservée");

      return false;
    }
  }

  for (let child of caseDateDepart.children) {
    if (
      child.classList.contains("matin") &&
      child.classList.contains("reserve")
    ) {
      popupAlert("La date de départ est déjà réservée");
      return false;
    }
  }

  for (let i = 0; i < dateArray.length; i++) {
    const caseDate = document.getElementById(dateArray[i]);
    for (let child of caseDate.children) {
      //console.log(child);
      if (child.classList.contains("reserve")) {
        popupAlert("La date choisie est déjà réservée");

        return false;
      }
    }
  }
  console.log("pas de doublon");
  return true;
}
//-----------------------------------------------------------------------------
//gestion des messages en fonction des erreurs
//-----------------------------------------------------------------------------

export function popupAlert(message) {
  const alert = document.querySelector(".popupAlert");
  const zoneMessage = document.querySelector(".message");
  const btnFermer = document.querySelector(".fermer");
  zoneMessage.innerText = message;
  alert.style.display = "block";
  function onClickFermer() {
    alert.style.display = "none";
    btnFermer.removeEventListener("click", onClickFermer);
  }
  btnFermer.addEventListener("click", onClickFermer);
}

//-----------------------------------------------------------
//enregistrement d'un objet json dans le repertoire locataire.json au niveau du serveur
//------------------------------------------------------------------------

async function enregistreLocataireMois(mois, year) {
  const dataClient = {
    annee: year,
    mois: mois,
    couleur: document.getElementById("color").value,
    arrive: document.getElementById("arrive").value,
    depart: document.getElementById("depart").value,
    telephone: document.getElementById("tel").value,
    email: document.getElementById("email").value,
    immatriculation: document.getElementById("immat").value,
    commentaire: document.getElementById("commentaire").value,
    siblu: document.getElementById("siblu").value,
    nom1: document.getElementById("nom1").value,
    nom2: document.getElementById("nom2").value,
    nom3: document.getElementById("nom3").value,
    nom4: document.getElementById("nom4").value,
    nom5: document.getElementById("nom5").value,
    nom6: document.getElementById("nom6").value,
    nom7: document.getElementById("nom7").value,
    nom8: document.getElementById("nom8").value,
    prenom1: document.getElementById("prenom1").value,
    prenom2: document.getElementById("prenom2").value,
    prenom3: document.getElementById("prenom3").value,
    prenom4: document.getElementById("prenom4").value,
    prenom5: document.getElementById("prenom5").value,
    prenom6: document.getElementById("prenom6").value,
    prenom7: document.getElementById("prenom7").value,
    prenom8: document.getElementById("prenom8").value,
    age1: document.getElementById("age1").value,
    age2: document.getElementById("age2").value,
    age3: document.getElementById("age3").value,
    age4: document.getElementById("age4").value,
    age5: document.getElementById("age5").value,
    age6: document.getElementById("age6").value,
    age7: document.getElementById("age7").value,
    age8: document.getElementById("age8").value,
    dateNaissance1: document.getElementById("nais1").value,
    dateNaissance2: document.getElementById("nais2").value,
    dateNaissance3: document.getElementById("nais3").value,
    dateNaissance4: document.getElementById("nais4").value,
    dateNaissance5: document.getElementById("nais5").value,
    dateNaissance6: document.getElementById("nais6").value,
    dateNaissance7: document.getElementById("nais7").value,
    dateNaissance8: document.getElementById("nais8").value,
  };
  const chargeUtile = JSON.stringify(dataClient);
  try {
    const response = await fetch("http://localhost:3000/locataires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    });

    // Attendre la conversion de la réponse en JSON
    const result = await response.json();
    creerCardLocataire();
    // Log ou utilise le résultat selon tes besoins
    console.log(result);

    // Faire d'autres opérations après avoir reçu la réponse
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du locataire :", error);
  }

  // Retourner ou exécuter d'autres opérations après avoir traité la réponse
  return;
}

//-----------------------------------------------------
//importer le fichier locataires .json
//---------------------------------------------------

async function recupListClients() {
  try {
    const response = await fetch("http://localhost:3000/locataires");
    const data = await response.json();
    //console.log("Success:", data); // Vérifie la structure des données ici
    return data; // Retourne les données JSON
  } catch (error) {
    //popupAlert("Erreur lors de la recuperation des clients : " + error);
    console.error("Error:", error);
    return null; // Retourne null en cas d'erreur
  }
}
//-----------------------------------------------------------
//creer une carte par locataire present ds le json
//---------------------------------------------------------

export async function creerCardLocataire() {
  const clientsData = await recupListClients();
  //nettoyer les cases avant de mettre a jour
  const caseAnettoyer = document.querySelectorAll(".aprem, .matin");
  for (let i = 0; i < caseAnettoyer.length; i++) {
    caseAnettoyer[i].style.backgroundColor = null;
  }

  if (!clientsData) {
    console.error("Erreur lors de la récupération des données des clients");
    return;
  }

  // Convertis l'objet clientsData en un tableau
  const clientsArray = Object.values(clientsData);

  const year = document.getElementById("year").value;

  // Filtre les clients dont l'année correspond à la valeur saisie
  const filteredClients = clientsArray.filter((client) => client.annee == year);

  if (filteredClients.length > 0) {
    //console.log("Clients pour l'année", year, ":", filteredClients);
    const clienstTries = trierAnneeParMois(filteredClients);
    creerDivLocataire(clienstTries.anneeMars, "cardsMars");
    creerDivLocataire(clienstTries.anneeAvril, "cardsAvril");
    creerDivLocataire(clienstTries.anneeMai, "cardsMai");
    creerDivLocataire(clienstTries.anneeJuin, "cardsJuin");
    creerDivLocataire(clienstTries.anneeJuillet, "cardsJuillet");
    creerDivLocataire(clienstTries.anneeAout, "cardsAout");
    creerDivLocataire(clienstTries.anneeSeptembre, "cardsSeptembre");
    creerDivLocataire(clienstTries.anneeOctobre, "cardsOctobre");
    creerDivLocataire(clienstTries.anneeNovembre, "cardsNovembre");

    return;
  } else {
    creerDivLocataire([], "cardsMars");
    creerDivLocataire([], "cardsAvril");
    creerDivLocataire([], "cardsMai");
    creerDivLocataire([], "cardsJuin");
    creerDivLocataire([], "cardsJuillet");
    creerDivLocataire([], "cardsAout");
    creerDivLocataire([], "cardsSeptembre");
    creerDivLocataire([], "cardsOctobre");
    creerDivLocataire([], "cardsNovembre");
    //popupAlert("Aucun client trouvé pour l'année " + year);
    return;
  }
}

//creer une div par client a cette etape l'annee est deja triée
//si mois est mars,avril...alors parent est .cardsMars,...
//pour chaque element de mois creer une div enfant

//ajouter un id a la div
function creerDivLocataire(mois, idDiv) {
  //nettoyer les div avant de les remplir
  const parentMois = document.getElementById(idDiv);
  //supprimer tout les enfants
  parentMois.innerHTML = "";

  //console.log(mois);
  if (mois.length > 0) {
    for (let i = 0; i < mois.length; i++) {
      const LocMois = mois[i];
      const locElement = document.createElement("div");
      locElement.id =
        mois[i].nom1.toUpperCase() + "-" + mois[i].prenom1.toUpperCase();
      locElement.classList.add("locataire");

      locElement.addEventListener("click", function (event) {
        //recuperer l'id du locataire cliqueé
        const idLoc = event.currentTarget.id;
        //console.log(idLoc + "id locataire");
        //afficher la popup avec infos locataire
        console.log(idLoc);
        popupInfo(idLoc);
      });
      const nomLoc = document.createElement("h4");
      nomLoc.innerHTML =
        locElement.id +
        "<br>" +
        " du " +
        LocMois.arrive +
        " au " +
        LocMois.depart;
      nomLoc.style.backgroundColor = mois[i].couleur;
      locElement.appendChild(nomLoc);
      parentMois.appendChild(locElement);
      //console.log(locElement.id);
      remplissageCalendrier(LocMois.arrive, LocMois.depart, LocMois.couleur);
    }
    return;
  } else {
    // console.log("pas de locataire");
    return;
  }
}

function trierAnneeParMois(listClientAnnee) {
  const anneeMars = listClientAnnee.filter((client) => client.mois == "mars");
  const anneeAvril = listClientAnnee.filter((client) => client.mois == "avril");
  const anneeMai = listClientAnnee.filter((client) => client.mois == "mai");
  const anneeJuin = listClientAnnee.filter((client) => client.mois == "juin");
  const anneeJuillet = listClientAnnee.filter(
    (client) => client.mois == "juillet"
  );
  const anneeAout = listClientAnnee.filter((client) => client.mois == "aout");
  const anneeSeptembre = listClientAnnee.filter(
    (client) => client.mois == "septembre"
  );
  const anneeOctobre = listClientAnnee.filter(
    (client) => client.mois == "octobre"
  );
  const anneeNovembre = listClientAnnee.filter(
    (client) => client.mois == "novembre"
  );
  return {
    anneeMars,
    anneeAvril,
    anneeMai,
    anneeJuin,
    anneeJuillet,
    anneeAout,
    anneeSeptembre,
    anneeOctobre,
    anneeNovembre,
  };
}

//------------------------------------------------------------
//fonction lorsque l'on click sur une carte locataire
//------------------------------------------------------------
async function popupInfo(idLocataire) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(); // Format local
  const zoneTitre = document.getElementById("titrePopup");
  boutonSave.innerText = "Modifier";
  zoneTitre.innerText = "Info locataire";
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
  //vider les inputs
  const allInput = document.querySelectorAll(".dataLoc");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }

  //remplir les inputs
  const clientsData = await recupListClients();
  const client = clientsData[idLocataire];
  console.log(idLocataire);

  const mois = client.mois;
  const year = client.annee;
  const nbrYear = +year;

  const zoneArrive = document.getElementById("arrive");
  zoneArrive.value = client.arrive;
  const zoneDepart = document.getElementById("depart");
  zoneDepart.value = client.depart;
  const couleur = document.getElementById("color");
  couleur.value = client.couleur;
  const zoneNom1 = document.getElementById("nom1");
  zoneNom1.value = client.nom1;
  const zonePrenom1 = document.getElementById("prenom1");
  zonePrenom1.value = client.prenom1;
  const zoneNom2 = document.getElementById("nom2");
  zoneNom2.value = client.nom2;
  const zonePrenom2 = document.getElementById("prenom2");
  zonePrenom2.value = client.prenom2;
  const zoneNom3 = document.getElementById("nom3");
  zoneNom3.value = client.nom3;
  const zonePrenom3 = document.getElementById("prenom3");
  zonePrenom3.value = client.prenom3;
  const zoneNom4 = document.getElementById("nom4");
  zoneNom4.value = client.nom4;
  const zonePrenom4 = document.getElementById("prenom4");
  zonePrenom4.value = client.prenom4;
  const zoneNom5 = document.getElementById("nom5");
  zoneNom5.value = client.nom5;
  const zonePrenom5 = document.getElementById("prenom5");
  zonePrenom5.value = client.prenom5;
  const zoneNom6 = document.getElementById("nom6");
  zoneNom6.value = client.nom6;
  const zonePrenom6 = document.getElementById("prenom6");
  zonePrenom6.value = client.prenom6;
  const zoneNom7 = document.getElementById("nom7");
  zoneNom7.value = client.nom7;
  const zonePrenom7 = document.getElementById("prenom7");
  zonePrenom7.value = client.prenom7;
  const zoneNom8 = document.getElementById("nom8");
  zoneNom8.value = client.nom8;
  const zonePrenom8 = document.getElementById("prenom8");
  zonePrenom8.value = client.prenom8;
  const zoneTel = document.getElementById("tel");
  zoneTel.value = client.telephone;
  const zoneEmail = document.getElementById("email");
  zoneEmail.value = client.email;
  const zoneImmat = document.getElementById("immat");
  zoneImmat.value = client.immatriculation;
  const zoneSiblu = document.getElementById("siblu");
  zoneSiblu.value = client.siblu;
  const zoneCommentaire = document.getElementById("commentaire");
  zoneCommentaire.value = client.commentaire;
  const zoneAge1 = document.getElementById("age1");
  zoneAge1.value = client.age1;

  const zoneAge2 = document.getElementById("age2");
  zoneAge2.value = client.age2;
  const zoneAge3 = document.getElementById("age3");
  zoneAge3.value = client.age3;
  const zoneAge4 = document.getElementById("age4");
  zoneAge4.value = client.age4;
  const zoneAge5 = document.getElementById("age5");
  zoneAge5.value = client.age5;
  const zoneAge6 = document.getElementById("age6");
  zoneAge6.value = client.age6;
  const zoneAge7 = document.getElementById("age7");
  zoneAge7.value = client.age7;
  const zoneAge8 = document.getElementById("age8");
  zoneAge8.value = client.age8;

  const zoneNais1 = document.getElementById("nais1");
  zoneNais1.value = client.dateNaissance1;

  const zoneNais2 = document.getElementById("nais2");
  zoneNais2.value = client.dateNaissance2;
  const zoneNais3 = document.getElementById("nais3");
  zoneNais3.value = client.dateNaissance3;
  const zoneNais4 = document.getElementById("nais4");
  zoneNais4.value = client.dateNaissance4;
  const zoneNais5 = document.getElementById("nais5");
  zoneNais5.value = client.dateNaissance5;
  const zoneNais6 = document.getElementById("nais6");
  zoneNais6.value = client.dateNaissance6;
  const zoneNais7 = document.getElementById("nais7");
  zoneNais7.value = client.dateNaissance7;
  const zoneNais8 = document.getElementById("nais8");
  zoneNais8.value = client.dateNaissance8;

  if (zoneNais1.value == "" && zoneAge1.value != "") {
    const nbrAge1 = parseInt(zoneAge1.value, 10);
    const anneNais1 = nbrYear - nbrAge1;
    const nbrAnneNais1 = +anneNais1;
    zoneNais1.value = nbrAnneNais1 + "-01-01";
  } else {
    if (zoneNais1.value != "" && zoneAge1.value == "") {
      const anneNais1 = new Date(zoneNais1.value).getFullYear();
      zoneAge1.value = nbrYear - anneNais1;
    }
  }
  if (zoneNais2.value == "" && zoneAge2.value != "") {
    const nbrAge2 = parseInt(zoneAge2.value, 10);
    const anneNais2 = nbrYear - nbrAge2;
    const nbrAnneNais2 = +anneNais2;
    zoneNais2.value = nbrAnneNais2 + "-01-01";
  } else {
    if (zoneNais2.value != "" && zoneAge2.value == "") {
      const anneNais2 = new Date(zoneNais2.value).getFullYear();
      zoneAge2.value = nbrYear - anneNais2;
    }
  }
  if (zoneNais3.value == "" && zoneAge3.value != "") {
    const nbrAge3 = parseInt(zoneAge3.value, 10);
    const anneNais3 = nbrYear - nbrAge3;
    const nbrAnneNais3 = +anneNais3;
    zoneNais3.value = nbrAnneNais3 + "-01-01";
  } else {
    if (zoneNais3.value != "" && zoneAge3.value == "") {
      const anneNais3 = new Date(zoneNais3.value).getFullYear();
      zoneAge3.value = nbrYear - anneNais3;
    }
  }
  if (zoneNais4.value == "" && zoneAge4.value != "") {
    const nbrAge4 = parseInt(zoneAge4.value, 10);
    const anneNais4 = nbrYear - nbrAge4;
    const nbrAnneNais4 = +anneNais4;
    zoneNais4.value = nbrAnneNais4 + "-01-01";
  } else {
    if (zoneNais4.value != "" && zoneAge4.value == "") {
      const anneNais4 = new Date(zoneNais4.value).getFullYear();
      zoneAge4.value = nbrYear - anneNais4;
    }
  }
  if (zoneNais5.value == "" && zoneAge5.value != "") {
    const nbrAge5 = parseInt(zoneAge5.value, 10);
    const anneNais5 = nbrYear - nbrAge5;
    const nbrAnneNais5 = +anneNais5;
    zoneNais5.value = nbrAnneNais5 + "-01-01";
  } else {
    if (zoneNais5.value != "" && zoneAge5.value == "") {
      const anneNais5 = new Date(zoneNais5.value).getFullYear();
      zoneAge5.value = nbrYear - anneNais5;
    }
  }
  if (zoneNais6.value == "" && zoneAge6.value != "") {
    const nbrAge6 = parseInt(zoneAge6.value, 10);
    const anneNais6 = nbrYear - nbrAge6;
    const nbrAnneNais6 = +anneNais6;
    zoneNais6.value = nbrAnneNais6 + "-01-01";
  } else {
    if (zoneNais6.value != "" && zoneAge6.value == "") {
      const anneNais6 = new Date(zoneNais6.value).getFullYear();
      zoneAge6.value = nbrYear - anneNais6;
    }
  }
  if (zoneNais7.value == "" && zoneAge7.value != "") {
    const nbrAge7 = parseInt(zoneAge7.value, 10);
    const anneNais7 = nbrYear - nbrAge7;
    const nbrAnneNais7 = +anneNais7;
    zoneNais7.value = nbrAnneNais7 + "-01-01";
  } else {
    if (zoneNais7.value != "" && zoneAge7.value == "") {
      const anneNais7 = new Date(zoneNais7.value).getFullYear();
      zoneAge7.value = nbrYear - anneNais7;
    }
  }
  if (zoneNais8.value == "" && zoneAge8.value != "") {
    const nbrAge8 = parseInt(zoneAge8.value, 10);
    const anneNais8 = nbrYear - nbrAge8;
    const nbrAnneNais8 = +anneNais8;
    zoneNais8.value = nbrAnneNais8 + "-01-01";
  } else {
    if (zoneNais8.value != "" && zoneAge8.value == "") {
      const anneNais8 = new Date(zoneNais8.value).getFullYear();
      zoneAge8.value = nbrYear - anneNais8;
    }
  }
  const parentNom = document.querySelector(".nom");
  const touteZoneNom = parentNom.querySelectorAll("input");

  let decompteNbrPers = 0;
  for (let input of touteZoneNom) {
    if (input.value != "") {
      decompteNbrPers++;
    }
  }
  const zoneNbrPers = document.getElementById("total");
  zoneNbrPers.value = decompteNbrPers;

  const parentAge = document.querySelector(".age");
  const touteZoneAge = parentAge.querySelectorAll("input");
  let decompteNbrBebe = 0;
  for (let input of touteZoneAge) {
    if (input != "" && input.value < 4) {
      decompteNbrBebe++;
    }
  }

  let decompteEnfant = 0;
  for (let input of touteZoneAge) {
    if (input.value != "" && input.value > 3 && input.value < 18) {
      console.log(decompteEnfant);
      decompteEnfant++;
    }
  }
  let decompteAdultes = 0;
  for (let input of touteZoneAge) {
    if (input.value > 17) {
      decompteAdultes++;
    }
  }
  const zoneNbrBebe = document.getElementById("bebe");
  zoneNbrBebe.value = decompteNbrBebe;
  const zoneNbrEnfant = document.getElementById("enfant");
  zoneNbrEnfant.value = decompteEnfant;
  const zoneNbrAdulte = document.getElementById("adulte");
  zoneNbrAdulte.value = decompteAdultes;

  function onClickModif() {
    const dateArrive = new Date(client.arrive);
    const dateDepart = new Date(client.depart);
    const dateArray = [];
    let date = new Date(dateArrive);
    date.setDate(date.getDate() + 1); //partir au jour d'apres
    while (date < dateDepart) {
      dateArray.push(date.toISOString().split("T")[0]);
      date.setDate(date.getDate() + 1);
    }
    const caseDateArrivee = document.getElementById(client.arrive);
    const caseDateDepart = document.getElementById(client.depart);

    //console.log(caseDateArrivee);
    //recupérer la div enfant qui a aprem comme class

    for (let child of caseDateArrivee.children) {
      if (child.classList.contains("aprem")) {
        child.classList.remove("reserve");
        //console.log(child);
      }
    }

    for (let child of caseDateDepart.children) {
      if (child.classList.contains("matin")) {
        //mettre le style de idLocataire.couleur

        child.classList.remove("reserve");
        //console.log(child);
      }
    }

    for (let i = 0; i < dateArray.length; i++) {
      const caseDate = document.getElementById(dateArray[i]);
      for (let child of caseDate.children) {
        child.classList.remove("reserve");
        //console.log(child);
      }
    }
    if (
      verifAnne(year) &&
      verifMois(mois) &&
      verifClient() &&
      verifDoublon() &&
      verifArriveAvantDepart()
    ) {
      enregistreLocataireMois(mois, year);

      const popup = document.querySelector(".popup");
      popup.style.display = "none";
      boutonQuitter.removeEventListener("click", onClickQuitter);
      boutonSupp.removeEventListener("click", onClickSupp);
      boutonSave.removeEventListener("click", onClickModif);
      return;
    } else {
      //popupAlert("verifier les infos");
      //console.log("popupinfo");
      // const popup = document.querySelector(".popup");
      // popup.style.display = "none";
      // boutonSave.removeEventListener("click", onClickModif);
      return;
    }
  }

  function onClickQuitter() {
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
    boutonQuitter.removeEventListener("click", onClickQuitter);
    boutonSupp.removeEventListener("click", onClickSupp);
    boutonSave.removeEventListener("click", onClickModif);
  }

  function onClickSupp() {
    const demiANettoyer = document.querySelectorAll(".demi");
    for (let i = 0; i < demiANettoyer.length; i++) {
      demiANettoyer[i].classList.remove("reserve");
    }
    const allInput = document.querySelectorAll(".dataLoc");
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = "";
    }
    //supprimer le locataire dans le fichier json
    supprimeLocataire(idLocataire);
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
    boutonQuitter.removeEventListener("click", onClickQuitter);
    boutonSupp.removeEventListener("click", onClickSupp);
    boutonSave.removeEventListener("click", onClickModif);
  }
  boutonSave.addEventListener("click", onClickModif);
  boutonQuitter.addEventListener("click", onClickQuitter);
  boutonSupp.addEventListener("click", onClickSupp);
}

//--------------------------------------------------------
//suppression de l'objet locataire ds le json
//----------------------------------------------------

async function supprimeLocataire(idLocataire) {
  //
  //supprimer le locataire dans le fichier json

  //ajouter supprimer les id reserve
  try {
    const response = await fetch(
      `http://localhost:3000/locataires/${idLocataire}`,
      {
        method: "DELETE",
      }
    );
    console.log("id a  supprimé:", idLocataire);
    if (response.ok) {
      popupAlert(idLocataire + " a été supprimé");
      //console.log("Client supprimé:", idLocataire);
      // Actualiser l'interface utilisateur après la suppression
      creerCardLocataire();
    } else {
      popupAlert("Echec de la suppression du client " + idLocataire);
      //console.error("Erreur lors de la suppression du client:", idLocataire);
    }
  } catch (error) {
    popupAlert("Erreur lors de la suppression du client : " + error);
    //console.error("Erreur lors de la suppression du client:", error);
  }
}
//--------------------------------------------------------------------
//mettre a jour calendrier en fonction des clients du mois
//-------------------------------------------------------------------
function remplissageCalendrier(arrive, depart, couleur) {
  const dateArrive = new Date(arrive);
  const dateDepart = new Date(depart);
  const dateArray = [];
  let date = new Date(dateArrive);
  date.setDate(date.getDate() + 1); //partir au jour d'apres
  while (date < dateDepart) {
    dateArray.push(date.toISOString().split("T")[0]);
    date.setDate(date.getDate() + 1);
  }
  const caseDateArrivee = document.getElementById(arrive);
  const caseDateDepart = document.getElementById(depart);

  //console.log(caseDateArrivee);
  //recupérer la div enfant qui a aprem comme class
  for (let child of caseDateArrivee.children) {
    if (child.classList.contains("aprem")) {
      //mettre le style de idLocataire.couleur
      child.style.backgroundColor = couleur;
      child.classList.add("reserve");
    }
  }

  for (let child of caseDateDepart.children) {
    if (child.classList.contains("matin")) {
      //mettre le style de idLocataire.couleur
      child.style.backgroundColor = couleur;
      child.classList.add("reserve");
    }
  }

  for (let i = 0; i < dateArray.length; i++) {
    const caseDate = document.getElementById(dateArray[i]);
    for (let child of caseDate.children) {
      child.style.backgroundColor = couleur;
      child.classList.add("reserve");
    }
  }
}
