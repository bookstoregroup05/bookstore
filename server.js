const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
var passport = require("./config/passport");
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const sequelize = require("./config/connection.js");
var compression = require('compression')


const app = express();
const PORT = process.env.PORT || 3001;


// compress all responses
app.use(compression())

// Requiring our models for syncing
var db = require("./models");


const sess = {
    secret: 'Super secret secret',
    resave: true,
    saveUninitialized: true
  };

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/book-api-routes.js")(app);
require("./routes/shoppingcart-api-routes.js")(app);
require("./routes/purchase-api-routes.js")(app);

// app.use(require('./controllers/'));

db.sequelize.sync().then(function() {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
});