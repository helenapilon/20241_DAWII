const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin:
    "Aqui informamos quais urls permitimos que sejam conectadas ao nosso backend. Iremos alterar para a url do nosso frontend",
};

app.use(cors(corsOptions));
//parser de requisições com content type - application/json
app.use(express.json());
//parser de requisições com content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", function (req, res) {
  res.send("Desenvolvimento de Aplicações WEB II");
});

app.get("/aula1", function (req, res) {
  res.send("Primeira aula - DAW II");
});

require("./routes/produto.routes")(app);
require("./routes/categoria.routes")(app);
require("./routes/vendedor.routes")(app);
require("./routes/loja.routes")(app);
require("./routes/usuario.routes")(app);

app.listen(8000, function (req, res) {
  console.log("App rodando na porta 8000");
});
