import { model } from "mongoose";
import { Request, Response } from "express";
import { ILogin } from "../models/loginModel";
import { sign } from "jsonwebtoken";
import { TOKEN_SECRET, DEFAULT_TOKEN_EXPIRY } from "../../config";
import jwt from 'jsonwebtoken';
const login = model<ILogin>("login");
const INVALID_LOGIN = "Email or password was incorrect!";

export function create_login(req: Request, res: Response) {
  const newLogin = new login(req.body);
  var error = "";
  if (!newLogin.email) {
    error = "Email field is empty!";
  }
  if (!newLogin.name) {
    error = "Name field is empty!";
  }
  if (!newLogin.password) {
    error = "Password field is empty!";
  }
  if (error) {
    res.status(400).json({
      message: error,
    });
    return;
  }
  login
    .findOne({
      email: newLogin.email,
    })
    .exec((err, existingUser) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (existingUser) {
        res.status(400).json({ message: "This email already exists!" });
        return;
      }

      newLogin.save((err, login) => {
        if (err) {
          res.send(err);
        }
        res.json({
          token: sign(
            {
              email: newLogin.email,
            },
            TOKEN_SECRET,
            {
              expiresIn: DEFAULT_TOKEN_EXPIRY,
            }
          ),
          name: login.name,
          email: login.email
        });
      });
    });
}

export function validate_login(req: Request, res: Response) {
  login
    .findOne({
      email: req.body.email,
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (!user) {
        res.status(400).json({
          message: INVALID_LOGIN,
        });
        return;
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        if (!isMatch) {
          res.status(400).json({
            message: INVALID_LOGIN,
          });
        } else {
          res.json({
            token: jwt.sign({
              email: user.email
            }, TOKEN_SECRET, {
              expiresIn: DEFAULT_TOKEN_EXPIRY
            }),
            name: user.name,
            email: user.email
          })
        }
      });
    });
}

// export function update_a_login(req: Request, res: Response) {
//   login.findOneAndUpdate(
//     { _id: req.params.recipeId },
//     req.body,
//     { new: true },
//     (err, recipe) => {
//       if (err) res.send(err);
//       res.json(recipe);
//     }
//   );
// };

// export function delete_a_login(req: Request, res: Response) {
//     login.deleteOne({ _id: req.params.recipeId }, err => {
//     if (err) res.send(err);
//     res.json({
//       message: 'recipe successfully deleted',
//      _id: req.params.recipeId
//     });
//   });
// };
