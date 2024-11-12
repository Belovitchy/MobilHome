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
  let yearChoosed = 2020;
  //capture de l'année choisie
  let yearZone = document.getElementById("year");
  let btnValidYear = document.getElementById("validYear");
  btnValidYear.addEventListener("click", () => {
    yearChoosed = yearZone.value;
    // nettoyage de la grille avant de mettre a jour suite au clic
    let casesANettoyer = document.querySelectorAll(
      ".mars, .avril, .mai, .juin, .juillet, .aout, .septembre, .octobre, .novembre"
    );
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
  console.log(nbrJour);
  let baliseUnMois = document.querySelector(
    "." + mois + "." + premierJourDuMois
  );
  baliseUnMois.innerText = "1";
  let idDepart = baliseUnMois.id;
  idDepart = idDepart.substring(1);
  idDepart = +idDepart + 1;
  console.log(idDepart);

  for (let i = idDepart; i < nbrJour + idDepart - 1; i++) {
    let baliseSuivant = document.getElementById(sigleMois + i);

    baliseSuivant.innerText = i - idDepart + 2;
  }
  console.log(sigleMois + idDepart);
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
