module.exports = (app) => {
const usuarios = require("../controllers/usuario.controller.js" );
var router = require("express").Router();
// Rota para criar um usuario
router.post("/", usuarios.create);
// Rota que retorna todos os usuarios
router.get("/", usuarios.findAll);
// Rota que retorna um usuario pelo id
router.get("/:id", usuarios.findOne);
// Rota que atualiza um usuario pelo id
router.put("/:id", usuarios.update);
// Rota para deletar um usuario pelo id
router.delete("/:id", usuarios.delete);
// Rota para deletar todos os usuarios
router.delete("/", usuarios.deleteAll);
// A linha abaixo informa que todas essas rotas são encontradas após o /usuarios. Isto é, localhost:8080/usuarios/rota
app.use("/usuarios", router);
};