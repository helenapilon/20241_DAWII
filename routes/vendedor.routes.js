module.exports = (app) => {
const vendedors = require("../controllers/vendedor.controller.js" );
var router = require("express").Router();
// Rota para criar um vendedor
router.post("/", vendedors.create);
// Rota que retorna todos os vendedors
router.get("/", vendedors.findAll);
// Rota que retorna um vendedor pelo id
router.get("/:id", vendedors.findOne);
// Rota que atualiza um vendedor pelo id
router.put("/:id", vendedors.update);
// Rota para deletar um vendedor pelo id
router.delete("/:id", vendedors.delete);
// Rota para deletar todos os vendedors
router.delete("/", vendedors.deleteAll);
// A linha abaixo informa que todas essas rotas são encontradas após o /vendedors. Isto é, localhost:8080/vendedors/rota
app.use("/vendedores", router);
};