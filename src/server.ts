import * as express from "express"
import * as cors from "cors"
import { set, connect } from "mongoose"
import * as bodyParser from 'body-parser';

import "./api/models/recipeModel"
import recipeRoutes from "./api/routes/recipeRoute"

require('mongoose').Promise = global.Promise;
set('useFindAndModify', false);
connect(
  'mongodb://localhost:27017/robsRecipes',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const port = process.env.PORT || 3000;
const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "*",
  preflightContinue: false,
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

recipeRoutes(app);
app.listen(port);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
