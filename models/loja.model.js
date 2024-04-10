module.exports = (sequelize, Sequelize) => {
  const Loja = sequelize.define(
    "loja",
    {
      nome: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        //   allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
      },
    },
    //Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
    { freezeTableName: true }
  );

  return Loja;
};
