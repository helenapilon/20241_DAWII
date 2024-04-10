module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define(
    "categoria",
    {
      nome: {
        type: Sequelize.STRING,
      },
    },
    //Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
    { freezeTableName: true }
  );

  return Categoria;
};
