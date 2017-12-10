
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('public'));

require('./routes/burger-api-routes.js')(app);
require('./routes/html-routes.js')(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
  });
});
