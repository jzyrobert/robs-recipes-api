import { Application } from "express"
import { create_login, validate_login } from "../controllers/loginController";

export default function loginRoutes(app: Application) {
  app
    .route('/register')
    .post(create_login);

  app
    .route('/login')
    .post(validate_login)
};
