const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { config } = require('./config/environment');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const { port } = config;
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

const whitelist = ['http://localhost:3001', process.env.CLIENT_URL];
const options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Fetch no permitido por CORS'));
    }
  },
};
app.use(cors(options));

require('./libs/auth');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
