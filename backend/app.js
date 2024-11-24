const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs"); // pour lire et ecrire dans le fichier mars.json
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

app.post("/data", async (req, res) => {
  try {
    const dataAnnee = req.body;
    const anneeId = dataAnnee.anneeId;
    const cheminFichier = path.join(__dirname, "data.json");
    let donneeExistante = {};
    if (fs.existsSync(cheminFichier)) {
      const lectureDonnee = fs.readFileSync(cheminFichier); //Lit le contenu du fichier JSON.
      donneeExistante = JSON.parse(lectureDonnee); //Convertit le contenu du fichier JSON en un objet JavaScript.
    }
    donneeExistante[anneeId] = dataAnnee; //Met à jour ou ajoute les nouvelles données à l'objet existant avec anneeId comme clé.

    console.log(dataAnnee);
    // Écrit les données mises à jour dans le fichier data.json. null, 2 formate le JSON avec une indentation de 2 espaces pour une meilleure lisibilité.
    fs.writeFileSync(cheminFichier, JSON.stringify(donneeExistante, null, 2));

    // Opération asynchrone fictive
    //await saveToDatabase(dataMars);

    res.status(200).json({ message: "Données enregistrées avec succès" });
  } catch (error) {
    console.error("Erreur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement des données" });
  }
});

app.post("/locataires", async (req, res) => {
  try {
    const dataLoc = req.body;
    const nom1 = dataLoc.nom1;
    const prenom1 = dataLoc.prenom1;
    const key = `${nom1}-${prenom1}`.toUpperCase();
    const cheminFichier = path.join(__dirname, "locataires.json");
    let donneeExistante = {};
    if (fs.existsSync(cheminFichier)) {
      const lectureDonnee = fs.readFileSync(cheminFichier); //Lit le contenu du fichier JSON.
      donneeExistante = JSON.parse(lectureDonnee); //Convertit le contenu du fichier JSON en un objet JavaScript.
    }
    donneeExistante[key] = dataLoc;

    fs.writeFileSync(cheminFichier, JSON.stringify(donneeExistante, null, 2));

    res.status(200).json({ message: "Données enregistrées avec succès" });
    console.log(dataLoc);
  } catch (error) {
    console.error("Erreur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement des données" });
  }
});

app.get("/locataires", async (req, res) => {
  const cheminFichier = path.join(__dirname, "locataires.json");
  if (fs.existsSync(cheminFichier)) {
    const lectureDonnee = fs.readFileSync(cheminFichier); //Lit le contenu du fichier JSON.
    const donneeExistante = JSON.parse(lectureDonnee); //Convertit le contenu du fichier JSON en un objet JavaScript.

    //res.json(donneeExistante);
    res.status(200).json(donneeExistante);
  }
});

app.delete("/locataires/:key", async (req, res) => {
  const key = req.params.key;
  const cheminFichier = path.join(__dirname, "locataires.json");
  if (fs.existsSync(cheminFichier)) {
    const lectureDonnee = fs.readFileSync(cheminFichier); //Lit le contenu du fichier JSON.
    const donneeExistante = JSON.parse(lectureDonnee); //Convertit le contenu du fichier JSON en un objet JavaScript.
    delete donneeExistante[key];
    fs.writeFileSync(cheminFichier, JSON.stringify(donneeExistante, null, 2));
    res.status(200).json({ message: "Données enregistrées avec succès" });
  }
});

app.get("/data/:anneeId", async (req, res) => {
  const anneeId = req.params.anneeId;
  const filePath = path.join(__dirname, "data.json");

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    const existingData = JSON.parse(rawData);

    if (existingData[anneeId]) {
      res.json(existingData[anneeId]);
    } else {
      res.status(404).json({ message: `No data found for year ${anneeId}` });
    }
  } else {
    res.status(404).json({ message: "Data file not found" });
  }
});

module.exports = app; // pour pouvoir l'utiliser dans les autres fichiers
