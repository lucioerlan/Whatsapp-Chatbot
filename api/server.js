const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const express = require('express');
const fs = require('fs');
const ip = require('ip');
const Keygrip = require('keygrip');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
require('colors');

const usersRoutes = require('./src/routes/users-routes');
const orderRoutes = require('./src/routes/order-users-routes');
const swaggerConfig = require('./src/doc/swagger-config');

// Constants
const PORT = process.env.PORT || 5000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, '.log'), {
  flags: 'a',
});

app.use(cors());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(morgan('combined', { stream: accessLogStream }));

app.use(
  cookieSession({
    name: 'session',
    keys: new Keygrip(['SEKRIT2', 'SEKRIT2'], 'SHA384', 'base64'),
    maxAge: 5 * 100,
  })
);

app.use(function (req, res, next) {
  req.session.nowInMinutes = Math.floor(Date.now() / 5e3);
  next();
});

app.use('/api', [
  usersRoutes,
  orderRoutes,
  swaggerConfig
]);

//Error 404
app.get('*', (req, res) => {
  res.send({
    Error: `Invalid Route, Access http://${ip.address()}:${PORT}/api/docs`,
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is running at port ${PORT}, see more about the application on: http://${ip.address()}:${PORT}/api/docs`
      .bgBlue
  );
});
