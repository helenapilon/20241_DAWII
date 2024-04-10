module.exports = (app) => {
const lojas = require("../controllers/loja.controller.js" );
var router = require("express").Router();
// Rota para criar um loja
router.post("/", lojas.create);
// Rota que retorna todos os lojas
router.get("/", lojas.findAll);
// Rota que retorna um loja pelo id
router.get("/:id", lojas.findOne);
// Rota que atualiza um loja pelo id
router.put("/:id", lojas.update);
// Rota para deletar um loja pelo id
router.delete("/:id", lojas.delete);
// Rota para deletar todos os lojas
router.delete("/", lojas.deleteAll);
// A linha abaixo informa que todas essas rotas são encontradas após o /lojas. Isto é, localhost:8080/lojas/rota
app.use("/lojas", router);
};