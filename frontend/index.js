//const { response } = require("../backend/app");
import { creerCardLocataire } from "./locataires.js";
const month = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

const dayName = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

function ajouterIdDate(annee) {
  const cases = document.querySelectorAll(".date");
  for (let i = 0; i < cases.length; i++) {
    const parent = cases[i].parentElement;
    const jour = parent.innerText;
    //si parent contient la class mars
    if (parent.classList.contains("mars")) {
      cases[i].id = annee + "-" + "03" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("avril")) {
      cases[i].id = annee + "-" + "04" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("mai")) {
      cases[i].id = annee + "-" + "05" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("juin")) {
      cases[i].id = annee + "-" + "06" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("juillet")) {
      cases[i].id = annee + "-" + "07" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("aout")) {
      cases[i].id = annee + "-" + "08" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("septembre")) {
      cases[i].id = annee + "-" + "09" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("octobre")) {
      cases[i].id = annee + "-" + "10" + "-" + jour.toString().padStart(2, "0");
    }
    if (parent.classList.contains("novembre")) {
      cases[i].id = annee + "-" + "11" + "-" + jour.toString().padStart(2, "0");
    }
  }
}
// function nettoyerTextNodes() {
//   let casesANettoyer = document.querySelectorAll(
//     ".mars, .avril, .mai, .juin, .juillet, .aout, .septembre, .octobre, .novembre"
//   );

//   casesANettoyer.forEach((caseElement) => {
//     let childNodes = Array.from(caseElement.childNodes);
//     childNodes.forEach((child) => {
//       if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== "") {
//         caseElement.removeChild(child);
//       }
//     });
//   });
// }

//ajouter 2 div a chaque case
function ajouterDivCase() {
  let cases = document.querySelectorAll(
    ".mars, .avril, .mai, .juin, .juillet, .aout, .septembre, .octobre, .novembre"
  );
  for (let i = 0; i < cases.length; i++) {
    let divMatin = document.createElement("div");
    let divAprem = document.createElement("div");
    let divParent = document.createElement("div");
    //ajouter une classe au div
    divParent.classList.add("date");
    divMatin.classList.add("demi");
    divMatin.classList.add("matin");
    divAprem.classList.add("demi");
    divAprem.classList.add("aprem");
    cases[i].appendChild(divParent);
    divParent.appendChild(divMatin);
    divParent.appendChild(divAprem);
  }
}

let yearZone = document.getElementById("year");
let yearChoosed = yearZone.value;
//let yearChoosed = 2021;
//recupJoursReserve(yearChoosed);
demarage();

function demarage() {
  let mars = "mars";
  let avril = "avril";
  let mai = "mai";
  let juin = "juin";
  let juillet = "juillet";
  let aout = "aout";
  let septembre = "septembre";
  let octobre = "octobre";
  let novembre = "novembre";
  let firstDayMonth = [];
  let yearZone = document.getElementById("year");
  let yearChoosed = yearZone.value;
  recupJoursReserve(yearChoosed);
  // nettoyage de la grille avant de mettre a jour suite au clic
  let casesANettoyer = document.querySelectorAll(
    ".mars, .avril, .mai, .juin, .juillet, .aout, .septembre, .octobre, .novembre"
  );
  // casesANettoyer.forEach((caseElement) => {
  //   // Parcourir les nœuds enfants
  //   caseElement.childNodes.forEach((child) => {
  //     // Si le nœud est un nœud de texte, le supprimer
  //     if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== "") {
  //       caseElement.removeChild(child);
  //     }
  //   });
  // });
  for (let k = 0; k < casesANettoyer.length; k++) {
    casesANettoyer[k].innerText = "";
  }

  // remplir le tableau firstDayMonth avec le nom de chaque premier jour de chaque mois
  for (let j = 0; j < month.length; j++) {
    firstDayMonth[j] = getFirstDayOfMonth(yearChoosed, j);
  }
  //mise a jour de tout les mois
  miseAJourMois(firstDayMonth[2], mars, "m");
  miseAJourMois(firstDayMonth[3], avril, "a");
  miseAJourMois(firstDayMonth[4], mai, "i");
  miseAJourMois(firstDayMonth[5], juin, "j");
  miseAJourMois(firstDayMonth[6], juillet, "u");
  miseAJourMois(firstDayMonth[7], aout, "t");
  miseAJourMois(firstDayMonth[8], septembre, "s");
  miseAJourMois(firstDayMonth[9], octobre, "o");
  miseAJourMois(firstDayMonth[10], novembre, "n");
  ajouterDivCase();
  ajouterIdDate(yearChoosed);
  console.log(casesANettoyer[5].innerText);
}

function recupJoursReserve(annee) {
  console.log(annee);

  fetch(`http://localhost:3000/data/${annee}`)
    .then((response) => {
      if (!response.ok) {
        console.log("pas de donnees pour" + annee);
      }
      return response.json();
    })
    .then((data) => {
      let casesMarsUpdate = document.querySelectorAll(".mars");
      for (let i = 0; i < data.mars.length; i++) {
        if (data.mars[i] == true) {
          casesMarsUpdate[i].classList.add("clicked");
        } else {
          casesMarsUpdate[i].classList.remove("clicked");
        }
      }
      let casesAvrilUpdate = document.querySelectorAll(".avril");
      for (let i = 0; i < data.avril.length; i++) {
        if (data.avril[i] == true) {
          casesAvrilUpdate[i].classList.add("clicked");
        } else {
          casesAvrilUpdate[i].classList.remove("clicked");
        }
      }
      let casesMaiUpdate = document.querySelectorAll(".mai");
      for (let i = 0; i < data.mai.length; i++) {
        if (data.mai[i] == true) {
          casesMaiUpdate[i].classList.add("clicked");
        } else {
          casesMaiUpdate[i].classList.remove("clicked");
        }
      }
      let casesJuinUpdate = document.querySelectorAll(".juin");
      for (let i = 0; i < data.juin.length; i++) {
        if (data.juin[i] == true) {
          casesJuinUpdate[i].classList.add("clicked");
        } else {
          casesJuinUpdate[i].classList.remove("clicked");
        }
      }
      let casesJuilletUpdate = document.querySelectorAll(".juillet");
      for (let i = 0; i < data.juillet.length; i++) {
        if (data.juillet[i] == true) {
          casesJuilletUpdate[i].classList.add("clicked");
        } else {
          casesJuilletUpdate[i].classList.remove("clicked");
        }
      }
      let casesAoutUpdate = document.querySelectorAll(".aout");
      for (let i = 0; i < data.aout.length; i++) {
        if (data.aout[i] == true) {
          casesAoutUpdate[i].classList.add("clicked");
        } else {
          casesAoutUpdate[i].classList.remove("clicked");
        }
      }
      let casesSeptembreUpdate = document.querySelectorAll(".septembre");
      for (let i = 0; i < data.septembre.length; i++) {
        if (data.septembre[i] == true) {
          casesSeptembreUpdate[i].classList.add("clicked");
        } else {
          casesSeptembreUpdate[i].classList.remove("clicked");
        }
      }
      let casesOctobreUpdate = document.querySelectorAll(".octobre");
      for (let i = 0; i < data.octobre.length; i++) {
        if (data.octobre[i] == true) {
          casesOctobreUpdate[i].classList.add("clicked");
        } else {
          casesOctobreUpdate[i].classList.remove("clicked");
        }
      }
      let casesNovembreUpdate = document.querySelectorAll(".novembre");
      for (let i = 0; i < data.novembre.length; i++) {
        if (data.novembre[i] == true) {
          casesNovembreUpdate[i].classList.add("clicked");
        } else {
          casesNovembreUpdate[i].classList.remove("clicked");
        }
      }
      //la suite des evenements
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
    });
}

const boutonSave = document.querySelectorAll(".save");
//-------------------------------------------------
//retourne le premier jour de l'année choisie pour chaque mois
//met a jour tout les mois

function recupyear() {
  let mars = "mars";
  let avril = "avril";
  let mai = "mai";
  let juin = "juin";
  let juillet = "juillet";
  let aout = "aout";
  let septembre = "septembre";
  let octobre = "octobre";
  let novembre = "novembre";
  let firstDayMonth = [];

  //capture de l'année choisie
  let yearZone = document.getElementById("year");
  yearZone.addEventListener("input", function (event) {
    //executer la fonction creerCardLocataire
    creerCardLocataire();
    console.log("je suis a creerCardLocataire");

    let yearChoosed = yearZone.value;
    recupJoursReserve(yearChoosed);
    // nettoyage de la grille avant de mettre a jour suite au clic
    let casesANettoyer = document.querySelectorAll(
      ".mars, .avril, .mai, .juin, .juillet, .aout, .septembre, .octobre, .novembre"
    );
    // casesANettoyer.forEach((caseElement) => {
    //   // Parcourir les nœuds enfants
    //   caseElement.childNodes.forEach((child) => {
    //     // Si le nœud est un nœud de texte, le supprimer
    //     if (
    //       child.nodeType === Node.TEXT_NODE &&
    //       child.nodeValue.trim() !== ""
    //     ) {
    //       caseElement.removeChild(child);
    //     }
    //   });
    // });
    for (let k = 0; k < casesANettoyer.length; k++) {
      casesANettoyer[k].innerText = "";
    }

    console.log(casesANettoyer[5]);
    // remplir le tableau firstDayMonth avec le nom de chaque premier jour de chaque mois
    for (let j = 0; j < month.length; j++) {
      firstDayMonth[j] = getFirstDayOfMonth(yearChoosed, j);
    }
    //mise a jour de tout les mois
    miseAJourMois(firstDayMonth[2], mars, "m");
    miseAJourMois(firstDayMonth[3], avril, "a");
    miseAJourMois(firstDayMonth[4], mai, "i");
    miseAJourMois(firstDayMonth[5], juin, "j");
    miseAJourMois(firstDayMonth[6], juillet, "u");
    miseAJourMois(firstDayMonth[7], aout, "t");
    miseAJourMois(firstDayMonth[8], septembre, "s");
    miseAJourMois(firstDayMonth[9], octobre, "o");
    miseAJourMois(firstDayMonth[10], novembre, "n");
    ajouterDivCase();
    ajouterIdDate(yearChoosed);
  });

  return firstDayMonth;
}

recupyear();

// retoune le premier jour du mois en fonction de l'année et du mois
function getFirstDayOfMonth(year, month) {
  let date = new Date(year, month, 1);
  let day = date.getDay();
  return dayName[day];
}

//repartir le numero des jour en fonction du nom des jours
function miseAJourMois(premierJourDuMois, mois, sigleMois) {
  const joursParMois = {
    mars: 31,
    avril: 30,
    mai: 31,
    juin: 30,
    juillet: 31,
    aout: 31,
    septembre: 30,
    octobre: 31,
    novembre: 30,
  };
  let nbrJour = joursParMois[mois.toLowerCase()];

  let baliseUnMois = document.querySelector(
    "." + mois + "." + premierJourDuMois
  );
  baliseUnMois.innerText = "1";

  let idDepart = baliseUnMois.id;
  idDepart = idDepart.substring(1);
  idDepart = +idDepart + 1;

  for (let i = idDepart; i < nbrJour + idDepart - 1; i++) {
    let baliseSuivant = document.getElementById(sigleMois + i);

    baliseSuivant.innerText = i - idDepart + 2;
  }
}

//changer le fond des case au click pour visualiser la reservation
let cases = document.querySelectorAll(
  ".mars, .avril, .mai, .juin, .juillet, .aout, .septembre, .octobre, .novembre"
);
cases.forEach((caseElement) => {
  caseElement.addEventListener("click", () => {
    caseElement.classList.toggle("clicked");
  });
});
//ajouter event lidteneu aux boutons de sauvegarde
for (let i = 0; i < boutonSave.length; i++) {
  boutonSave[i].addEventListener("click", () => {
    let mars = document.querySelectorAll(".mars");
    let avril = document.querySelectorAll(".avril");
    let mai = document.querySelectorAll(".mai");
    let juin = document.querySelectorAll(".juin");
    let juillet = document.querySelectorAll(".juillet");
    let aout = document.querySelectorAll(".aout");
    let septembre = document.querySelectorAll(".septembre");
    let octobre = document.querySelectorAll(".octobre");
    let novembre = document.querySelectorAll(".novembre");

    let marsTab = [];
    let avrilTab = [];
    let maiTab = [];
    let juinTab = [];
    let juilletTab = [];
    let aoutTab = [];
    let septembreTab = [];
    let octobreTab = [];
    let novembreTab = [];
    for (let i = 0; i < mars.length; i++) {
      if (mars[i].classList.contains("clicked")) {
        marsTab[i] = true;
      } else {
        marsTab[i] = false;
      }
    }
    for (let i = 0; i < avril.length; i++) {
      if (avril[i].classList.contains("clicked")) {
        avrilTab[i] = true;
      } else {
        avrilTab[i] = false;
      }
    }
    for (let i = 0; i < mai.length; i++) {
      if (mai[i].classList.contains("clicked")) {
        maiTab[i] = true;
      } else {
        maiTab[i] = false;
      }
    }
    for (let i = 0; i < juin.length; i++) {
      if (juin[i].classList.contains("clicked")) {
        juinTab[i] = true;
      } else {
        juinTab[i] = false;
      }
    }
    for (let i = 0; i < juillet.length; i++) {
      if (juillet[i].classList.contains("clicked")) {
        juilletTab[i] = true;
      } else {
        juilletTab[i] = false;
      }
    }
    for (let i = 0; i < aout.length; i++) {
      if (aout[i].classList.contains("clicked")) {
        aoutTab[i] = true;
      } else {
        aoutTab[i] = false;
      }
    }
    for (let i = 0; i < septembre.length; i++) {
      if (septembre[i].classList.contains("clicked")) {
        septembreTab[i] = true;
      } else {
        septembreTab[i] = false;
      }
    }
    for (let i = 0; i < octobre.length; i++) {
      if (octobre[i].classList.contains("clicked")) {
        octobreTab[i] = true;
      } else {
        octobreTab[i] = false;
      }
    }
    for (let i = 0; i < novembre.length; i++) {
      if (novembre[i].classList.contains("clicked")) {
        novembreTab[i] = true;
      } else {
        novembreTab[i] = false;
      }
    }

    //faire un fichier json avec un marsTab, avrilTab, maiTab, juinTab, juilletTab, aoutTab, septembreTab, octobreTab, novembreTab

    const dataAnnee = {
      anneeId: yearChoosed,
      mars: marsTab,
      avril: avrilTab,
      mai: maiTab,
      juin: juinTab,
      juillet: juilletTab,
      aout: aoutTab,
      septembre: septembreTab,
      octobre: octobreTab,
      novembre: novembreTab,
    };
    const chargeUtile = JSON.stringify(dataAnnee);
    console.log(chargeUtile);
    //envoyer au serveur au port 3000
    fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
    //console.log(dataMars);
  });
}
