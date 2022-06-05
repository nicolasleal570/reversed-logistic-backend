const express = require('express');
const cors = require('cors');
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

const whitelist = ['http://localhost:3005', 'https://myapp.co'];
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
