import { IUser } from "./userModel";
import userSchema from "./userSchema";

export default class UserService {
  public createUser(user_params: IUser, callback: any) {
    const _session = new userSchema(user_params);
    _session.save(callback);
  }

  public filterUser(query: any, callback: any) {
    userSchema.findOne(query, callback);
  }

  public updateUser(user_params: IUser, callback: any) {
    const query = { _id: user_params._id };
    userSchema.findOneAndUpdate(query, user_params, callback);
  }

  public deleteUser(_id: String, callback: any) {
    const query = { _id: _id };
    userSchema.deleteOne(query, callback);
  }
}
