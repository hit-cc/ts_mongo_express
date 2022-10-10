import { Request, Response } from "express";
import {
  failureResponse,
  insufficientParameters,
  mongoError,
  successResponse,
} from "../modules/common/commonService";
import { IUser } from "../modules/users/userModel";
import UserService from "../modules/users/userService";

export class UserController {
  private user_service: UserService = new UserService();
  constructor() {}

  /**
   * create user
   */
  public create_user(req: Request, res: Response) {
    try {
      let { name, email, phone_number, gender } = req.body;
      let { first_name, last_name, middle_name } = req.body.name;
      if (
        name &&
        email &&
        phone_number &&
        gender &&
        first_name &&
        last_name &&
        middle_name
      ) {
        const user_params: IUser = {
          name: {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
          },
          email: email,
          phone_number: phone_number,
          gender: gender,
          modification_notes: [
            {
              modified_on: new Date(Date.now()),
              modified_by: "",
              modification_note: "",
            },
          ],
        };
        this.user_service.createUser(
          user_params,
          (err: any, user_data: IUser) => {
            if (err) {
              mongoError(err, res);
            } else {
              successResponse("user created successfully!", user_data, res);
            }
          }
        );
      } else {
        // return insufficient fields
        insufficientParameters(res);
      }
    } catch (error) {
      console.error("create_user try catch error =>>", error);
      throw error;
    }
  }

  /**
   * get users
   */
  public get_user(req: Request, res: Response) {
    try {
      let { id } = req.params;
      if (id) {
        const user_filter = { _id: id };
        this.user_service.filterUser(
          user_filter,
          (err: any, user_data: IUser) => {
            if (err) {
              mongoError(err, res);
            } else {
              successResponse("get user successfully!", user_data, res);
            }
          }
        );
      } else {
        insufficientParameters(res);
      }
    } catch (error) {
      console.error("get_user catch error =>>", error);
      throw error;
    }
  }

  /**
   * update user
   */
  public update_user(req: Request, res: Response) {
    try {
      if (
        (req.params.id && req.body.name) ||
        req.body.name.first_name ||
        req.body.name.middle_name ||
        req.body.name.last_name ||
        req.body.email ||
        req.body.phone_number ||
        req.body.gender
      ) {
        const user_filter = { _id: req.params.id };
        this.user_service.filterUser(
          user_filter,
          (err: any, user_data: IUser) => {
            if (err) {
              mongoError(err, res);
            } else if (user_data) {
              console.log("USERDATA==>", user_data);
              user_data.modification_notes = [
                {
                  modified_on: new Date(Date.now()),
                  modified_by: "update_user",
                  modification_note: "User data updated",
                },
              ];
              const user_params: IUser = {
                _id: req.params.id,
                name: req.body.name
                  ? {
                      first_name: req.body.name.first_name
                        ? req.body.name.first_name
                        : user_data.name.first_name,
                      middle_name: req.body.name.first_name
                        ? req.body.name.middle_name
                        : user_data.name.middle_name,
                      last_name: req.body.name.first_name
                        ? req.body.name.last_name
                        : user_data.name.last_name,
                    }
                  : user_data.name,
                email: req.body.email ? req.body.email : user_data.email,
                phone_number: req.body.phone_number
                  ? req.body.phone_number
                  : user_data.phone_number,
                gender: req.body.gender ? req.body.gender : user_data.gender,
                is_deleted: req.body.is_deleted
                  ? req.body.is_deleted
                  : user_data.is_deleted,
                modification_notes: user_data.modification_notes,
              };
              this.user_service.updateUser(user_params, (err: any) => {
                if (err) {
                  mongoError(err, res);
                } else {
                  successResponse("update user successfull", null, res);
                }
              });
            } else {
              failureResponse("invalid user", null, res);
            }
          }
        );
      } else {
        insufficientParameters(res);
      }
    } catch (error) {
      console.error("update_user catch error =>>", error);
      throw error;
    }
  }

  /**
   * delete_user
   */
  public delete_user(req: Request, res: Response) {
    try {
      if (req.params.id) {
        this.user_service.deleteUser(
          req.params.id,
          (err: any, delete_details: { deletedCount: number }) => {
            if (err) {
              mongoError(err, res);
            } else if (delete_details.deletedCount !== 0) {
              successResponse("delete user successfull", null, res);
            } else {
              failureResponse("invalid user", null, res);
            }
          }
        );
      } else {
        insufficientParameters(res);
      }
    } catch (error) {}
  }
}
