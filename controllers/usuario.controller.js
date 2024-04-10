const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;

// Cria e salva um novo usuario
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um usuario
  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  };

  // Salvar usuario no banco de dados
  Usuario.create(usuario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação de Usuario.",
      });
    });
};

// Retorna todos os usuarios do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Usuario.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Usuario.",
      });
    });
};

// Encontra um usuario pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Usuario com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Usuario via id=" + id,
      });
    });
};

// Atualiza os dados de um usuario
exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Usuario com id=${id}. Talvez usuario não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Usuario via id=" + id,
      });
    });
};

// Deleta um usuario pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Usuario foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar essa Usuario; Ela não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Usuario com id=" + id,
      });
    });
};

// Deleta todos os usuarios do banco de dados
exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Usuarios foram deletadas com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Usuarios.",
      });
    });
};
