module.exports = (app) => {
const categorias = require("../controllers/categoria.controller.js" );
var router = require("express").Router();
// Rota para criar um categoria
router.post("/", categorias.create);
// Rota que retorna todos os categorias
router.get("/", categorias.findAll);
// Rota que retorna um categoria pelo id
router.get("/:id", categorias.findOne);
// Rota que atualiza um categoria pelo id
router.put("/:id", categorias.update);
// Rota para deletar um categoria pelo id
router.delete("/:id", categorias.delete);
// Rota para deletar todos os categorias
router.delete("/", categorias.deleteAll);
// A linha abaixo informa que todas essas rotas são encontradas após o /categorias. Isto é, localhost:8080/categorias/rota
app.use("/categorias", router);
};