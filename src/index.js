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

const whitelist = [process.env.CLIENT_URL];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Fetch no permitido.'));
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
