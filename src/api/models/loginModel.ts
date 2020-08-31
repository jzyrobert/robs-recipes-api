import { model, Schema, Document } from "mongoose";
import { hash, compare } from "bcrypt";

export interface ILogin extends Document {
  email: string;
  name: string;
  password: string;
  comparePassword: (password: string, done: (err: Error, isMatch: boolean) => void) => void;
}

const loginSchema: Schema = new Schema({
  email: {
    type: String,
    required: "User email",
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: "User password",
  }
});

loginSchema.pre("save", function (next) {
  var login = this as ILogin;
  hash(login.password, 10, (err, hash) => {
    login.password = hash;
    next();
  });
});

loginSchema.methods.comparePassword = function (
  password: string,
  done: Function
) {
  compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

export default model<ILogin>("login", loginSchema);
