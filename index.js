const express = require('express');
const sequelize = require("./config/database")
const AuthentificationRoutes = require("./routes/AuthentificationRoutes")
const UtilisateurRoutes = require("./routes/UtilisateurRoutes")
const MaterielRoutes=require("./routes/MaterielRoutes")
const EmpruntRoutes=require("./routes/EmpruntRoutes")
const cookieParser = require('cookie-parser');
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const baseUri="/api/v1";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(baseUri+"/auth", AuthentificationRoutes);
app.use(baseUri, UtilisateurRoutes);
app.use(baseUri,MaterielRoutes);
app.use(baseUri,EmpruntRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Erreur de connexion à la base de données :', err);
});
