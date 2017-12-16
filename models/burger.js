
module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define('Burger', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

//   Burger.associate = function(models) {
//    Burger.belongsTo(models.Customer, {
//      foreignKey: {
//        allowNull: false
//      }
//    });
//  };

  return Burger;
};
