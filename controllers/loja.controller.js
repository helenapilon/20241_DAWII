const db = require("../models");
const Loja = db.lojas;
const Op = db.Sequelize.Op;

// Cria e salva um novo loja
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um loja
  const loja = {
    nome: req.body.nome,
    endereco: req.body.endereco,
    usuarioId: req.body.usuarioId
  };

  // Salvar loja no banco de dados
  Loja.create(loja)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação de Loja.",
      });
    });
};

// Retorna todos os lojas do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Loja.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Loja.",
      });
    });
};

// Encontra um loja pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Loja.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Loja com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Loja via id=" + id,
      });
    });
};

// Atualiza os dados de um loja
exports.update = (req, res) => {
  const id = req.params.id;

  Loja.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Loja foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Loja com id=${id}. Talvez loja não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Loja via id=" + id,
      });
    });
};

// Deleta um loja pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Loja.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Loja foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar essa Loja; Ela não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Loja com id=" + id,
      });
    });
};

// Deleta todos os lojas do banco de dados
exports.deleteAll = (req, res) => {
  Loja.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Lojas foram deletadas com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Lojas.",
      });
    });
};
