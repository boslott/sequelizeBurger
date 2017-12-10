
const db = require('../models');

module.exports = app => {

  app.get('/api/burgers', (req, res) => {
    db.Burger.findAll({}).then(dbBurger => {
      res.json(dbBurger);
    });
  });

  app.post('/api/burgers', (req, res) => {
    db.Burger.create(req.body).then(dbBurger => {
      res.json(dbBurger);
    });
  });

  app.put('/api/burgers/:id', (req, res) => {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(dbBurger => {
      res.json(dbBurger);
    });
  });

  app.delete('/api/burgers/:id', (req, res) => {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbBurger => {
      res.json(dbBurger);
    });
  });

};
