const db = require("../models");
const Vendedor = db.vendedores;
const Op = db.Sequelize.Op;

// Cria e salva um novo vendedor
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um vendedor
  const vendedor = {
    nome: req.body.nome,
    cargo: req.body.cargo,
    telefone: req.body.telefone,
    lojaId: req.body.lojaId,
  };

  // Salvar vendedor no banco de dados
  Vendedor.create(vendedor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação de Vendedor.",
      });
    });
};

// Retorna todos os vendedors do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Vendedor.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Vendedor.",
      });
    });
};

// Encontra um vendedor pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vendedor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Vendedor com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Vendedor via id=" + id,
      });
    });
};

// Atualiza os dados de um vendedor
exports.update = (req, res) => {
  const id = req.params.id;

  Vendedor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vendedor foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Vendedor com id=${id}. Talvez vendedor não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Vendedor via id=" + id,
      });
    });
};

// Deleta um vendedor pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Vendedor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vendedor foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar essa Vendedor; Ela não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Vendedor com id=" + id,
      });
    });
};

// Deleta todos os vendedors do banco de dados
exports.deleteAll = (req, res) => {
  Vendedor.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Vendedors foram deletadas com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Vendedors.",
      });
    });
};
