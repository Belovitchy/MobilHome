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
    popup(mois, year);
  });
}

//prevoir de l'appeler au chargement d'annee
creerCardLocataire();

function popup(mois, year) {
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
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
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
    console.log("Success:", data);
    return data; // Retourne les données JSON
  } catch (error) {
    console.error("Error:", error);
    return null; // Retourne null en cas d'erreur
  }
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

async function creerCardLocataire() {
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
    // Ajoute ici le code pour créer les cartes des locataires
  } else {
    console.log("Aucun client trouvé pour l'année", year);
  }
}
