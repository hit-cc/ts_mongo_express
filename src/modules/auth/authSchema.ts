import bycript from "bcrypt";
import { IAuth } from "./authModel";
import * as mongoose from "mongoose";
const saltRounds = 8;

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

authSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = bycript.hashSync(user.password as string, saltRounds);
  }
  next();
});
export default mongoose.model<IAuth>("authentication", authSchema);
