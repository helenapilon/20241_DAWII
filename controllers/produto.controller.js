const db = require("../models");
const Produto = db.produtos;
const Op = db.Sequelize.Op;

// Cria e salva um novo produto
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um produto
  const produto = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    lojaId: req.body.lojaId,
  };

  // Salvar produto no banco de dados
  Produto.create(produto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação de Produto.",
      });
    });
};

// Retorna todos os produtos do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Produto.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Produto.",
      });
    });
};

// Encontra um produto pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Produto com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Produto via id=" + id,
      });
    });
};

// Atualiza os dados de um produto
exports.update = (req, res) => {
  const id = req.params.id;

  Produto.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Produto foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Produto com id=${id}. Talvez produto não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Produto via id=" + id,
      });
    });
};

// Deleta um produto pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Produto.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Produto foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar essa Produto; Ela não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Produto com id=" + id,
      });
    });
};

// Deleta todos os produtos do banco de dados
exports.deleteAll = (req, res) => {
  Produto.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Produtos foram deletadas com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Produtos.",
      });
    });
};
