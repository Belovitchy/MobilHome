const mars = "mars";
const avril = "avril";
const mai = "mai";
const juin = "juin";
const juillet = "juillet";
const aout = "aout";
const septembre = "septembre";
const octobre = "octobre";
const novembre = "novembre";

const allBouton = document.querySelectorAll(".addClient");
for (let i = 0; i < allBouton.length; i++) {
  allBouton[i].addEventListener("click", function (event) {
    //recuperer l'id du bouton clické
    const idBouton = event.target.id;
    const year = document.getElementById("year").value;
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
    popupCreer(mois, year);
  });
}

//prevoir de l'appeler au chargement d'annee
creerCardLocataire();

function popupCreer(mois, year) {
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
  //vider les inputs
  const allInput = document.querySelectorAll(".dataLoc");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
  const boutonQuitter = document.getElementById("quit");
  const boutonSupp = document.getElementById("supp");
  const boutonSave = document.getElementById("enr");

  boutonSave.addEventListener("click", () => {
    enregistreLocataireMois(mois, year);
  });

  boutonQuitter.addEventListener("click", () => {
    creerCardLocataire();
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
  });

  boutonSupp.addEventListener("click", () => {
    const allInput = document.querySelectorAll(".dataLoc");
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = "";
    }
  });
}

function enregistreLocataireMois(mois, year) {
  const dataClient = {
    annee: year,
    mois: mois,
    arrive: document.getElementById("arrive").value,
    depart: document.getElementById("depart").value,
    telephone: document.getElementById("tel").value,
    email: document.getElementById("email").value,
    immatriculation: document.getElementById("immat").value,
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
  fetch("http://localhost:3000/locataires", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: chargeUtile,
  });
  console.log(dataClient);
}

async function recupListClients() {
  try {
    const response = await fetch("http://localhost:3000/locataires");
    const data = await response.json();
    console.log("Success:", data); // Vérifie la structure des données ici
    return data; // Retourne les données JSON
  } catch (error) {
    console.error("Error:", error);
    return null; // Retourne null en cas d'erreur
  }
}

export async function creerCardLocataire() {
  const clientsData = await recupListClients();

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
    console.log("Clients pour l'année", year, ":", filteredClients);
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

    //le pb est la
    // Ajoute ici le code pour créer les cartes des locataires ou fonction
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
    console.log("Aucun client trouvé pour l'année", year);
  }
}

//creer une div par client a cette etape l'annee est deja triée
//si mois est mars,avril...alors parent est .cardsMars,...
//pour chaque element de mois creer une div enfant
function creerDivLocataire(mois, idDiv) {
  //nettoyer les div avant de les remplir
  const parentMars = document.getElementById(idDiv);
  //supprimer tout les enfants
  parentMars.innerHTML = "";

  console.log(mois);
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
        console.log(idLoc + "id locataire");
        //afficher la popup avec infos locataire
        popupInfo(idLoc);
      });
      const nomLoc = document.createElement("h4");
      nomLoc.innerText =
        LocMois.nom1 + " du " + LocMois.arrive + " au " + LocMois.depart;
      locElement.appendChild(nomLoc);
      parentMars.appendChild(locElement);
    }
  } else {
    console.log("pas de locataire");
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

async function popupInfo(idLocataire) {
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
  const zoneArrive = document.getElementById("arrive");
  zoneArrive.value = client.arrive;
  const zoneDepart = document.getElementById("depart");
  zoneDepart.value = client.depart;
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

  const boutonQuitter = document.getElementById("quit");
  const boutonSupp = document.getElementById("supp");
  const boutonSave = document.getElementById("enr");
  const mois = client.mois;
  const year = client.annee;
  boutonSave.addEventListener("click", () => {
    enregistreLocataireMois(mois, year);
  });

  boutonQuitter.addEventListener("click", () => {
    creerCardLocataire();
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
  });

  boutonSupp.addEventListener("click", () => {
    //supprimer le locataire dans le fichier json
    supprimeLocataire(idLocataire);
  });
}

async function supprimeLocataire(idLocataire) {
  //supprimer le locataire dans le fichier json
  try {
    const response = await fetch(
      `http://localhost:3000/locataires/${idLocataire}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log("Client supprimé:", idLocataire);
      // Actualiser l'interface utilisateur après la suppression
      creerCardLocataire();
    } else {
      console.error("Erreur lors de la suppression du client:", idLocataire);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
  }
}
