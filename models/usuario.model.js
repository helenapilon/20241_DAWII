module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define(
    "usuario",
    {
      nome: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      senha: {
        type: Sequelize.STRING,
      },
    },
    //Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
    { freezeTableName: true }
  );

  return Usuario;
};
