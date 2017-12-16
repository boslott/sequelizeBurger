
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    burgersEaten: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  // Customer.associate = function(models) {
  //   Customer.hasMany(models.Burger, {});
  // };

  return Customer;
};
