const db = require("../models");
const Categoria = db.categorias;
const Op = db.Sequelize.Op;

// Cria e salva um novo categoria
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.nome) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um categoria
  const categoria = {
    nome: req.body.nome,
  };

  // Salvar categoria no banco de dados
  Categoria.create(categoria)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação de Categoria.",
      });
    });
};

// Retorna todos os categorias do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Categoria.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Categoria.",
      });
    });
};

// Encontra um categoria pelo id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Categoria com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Categoria via id=" + id,
      });
    });
};

// Atualiza os dados de um categoria
exports.update = (req, res) => {
  const id = req.params.id;

  Categoria.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Categoria foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Categoria com id=${id}. Talvez categoria não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Categoria via id=" + id,
      });
    });
};

// Deleta um categoria pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Categoria.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Categoria foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar essa Categoria; Ela não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Categoria com id=" + id,
      });
    });
};

// Deleta todos os categorias do banco de dados
exports.deleteAll = (req, res) => {
  Categoria.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Categorias foram deletadas com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Categorias.",
      });
    });
};
