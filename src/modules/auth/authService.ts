import { IAuth } from "./authModel";
import authSchema from "./authSchema";

export default class AuthService {
  constructor() {}

  public login(user: IAuth, callback: any) {
    try {
      const foundUser = authSchema.findOne({ username: user.username });
      if (!foundUser) {
        throw new Error("Name of user is not correct");
      }
      authSchema.findOne(foundUser, callback);
    } catch (error) {
      throw error;
    }
  }

  public async register(user: IAuth, callback: any) {
    try {
      let _new_user = new authSchema(user);
      _new_user.save(callback);
    } catch (error) {
      throw error;
    }
  }
}
