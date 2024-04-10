module.exports = (app) => {
const produtos = require("../controllers/produto.controller.js" );
var router = require("express").Router();
// Rota para criar um produto
router.post("/", produtos.create);
// Rota que retorna todos os produtos
router.get("/", produtos.findAll);
// Rota que retorna um produto pelo id
router.get("/:id", produtos.findOne);
// Rota que atualiza um produto pelo id
router.put("/:id", produtos.update);
// Rota para deletar um produto pelo id
router.delete("/:id", produtos.delete);
// Rota para deletar todos os produtos
router.delete("/", produtos.deleteAll);
// A linha abaixo informa que todas essas rotas são encontradas após o /produtos. Isto é, localhost:8080/produtos/rota
app.use("/produtos", router);
};