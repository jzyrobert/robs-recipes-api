import express from "express";
import cors from "cors";
import { set, connect, connection } from "mongoose";
import * as bodyParser from "body-parser";

import "./api/models/models";
import recipeRoutes from "./api/routes/recipeRoute";
import loginRoutes from "./api/routes/loginRoute";
import * as config from "./config";
import { handle_JWT_Unauthorized } from "./api/routes/jwtConfig";

console.log("Connecting to mongodb at " + config.MONGO_URL);

require("mongoose").Promise = global.Promise;
set("useFindAndModify", false);
connect(`mongodb://${config.MONGO_URL}/robsRecipes`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.on("error", (err) => {
  console.log(`Could not connect to mongoDB at ${config.MONGO_URL}!`);
  process.exit(1);
});

const app = express();

app.use(cors(config.CORS_OPTIONS));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Force https and secure token in production
if (app.get("env") === "production") {
  if (config.TOKEN_SECRET === config.DEV_TOKEN) {
    console.log("No secret token was provided in production mode!");
    process.exit(1);
  }

  app.use(function (req, res, next) {
    var protocol = req.get("x-forwarded-proto");
    protocol == "https"
      ? next()
      : res.redirect("https://" + req.hostname + req.url);
  });
}

recipeRoutes(app);
loginRoutes(app);

app.listen(config.LISTEN_PORT);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

// Handle JWT errors
app.use(handle_JWT_Unauthorized)

console.log(`Server started on port ${config.LISTEN_PORT}`);
