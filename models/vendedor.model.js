module.exports = (sequelize, Sequelize) => {
  const Vendedor = sequelize.define(
    "vendedor",
    {
      nome: {
        type: Sequelize.STRING,
      },
      cargo: {
        type: Sequelize.STRING,
      },
      telefone: {
        type: Sequelize.STRING,
      },
    },
    //Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
    { freezeTableName: true }
  );

  return Vendedor;
};
