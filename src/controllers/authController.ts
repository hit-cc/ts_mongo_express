import authService from "../modules/auth/authService";
import { Request, Response } from "express";
import {
  failureResponse,
  insufficientParameters,
  mongoError,
  successResponse,
} from "../modules/common/commonService";
import { IAuth } from "../modules/auth/authModel";
import * as bycript from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import environment from "../environment";
export class AuthController {
  private authService: authService = new authService();
  constructor() {}

  /**
   * login
   */
  public loginOne(req: Request, res: Response) {
    try {
      let { username, password } = req.body;
      if (username && password) {
        this.authService.login(req.body, (err: any, user_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            if (!user_data || user_data == null) {
              failureResponse(
                "User not Found! please check username & password",
                null,
                res
              );
            } else {
              const isMatch = bycript.compareSync(
                req.body.password,
                user_data.password
              );

              if (isMatch) {
                let _id = user_data._id;
                let token = jwt.sign(
                  { _id: _id?.toString(), username: user_data.username },
                  environment.getAccessTokenPrivateKey(),
                  {
                    expiresIn: "2 days",
                  }
                );

                successResponse(
                  `Welcome ${user_data.username} !`,
                  { _id, username, token },
                  res
                );
              } else {
                throw new Error("Password is not correct");
              }
            }
          }
        });
      } else {
        insufficientParameters(res);
      }
    } catch (error) {
      console.error("login catch error=>>", error);
      throw error;
    }
  }

  /**
   * register
   */
  public registerOne(req: Request, res: Response) {
    try {
      let { username, password } = req.body;
      if (username && password) {
        this.authService.register(
          { username, password },
          (err: any, user_data: IAuth) => {
            if (err) {
              mongoError(err, res);
            } else {
              successResponse(`user register successfully !`, user_data, res);
            }
          }
        );
      } else {
        insufficientParameters(res);
      }
    } catch (error) {
      console.error("registerOne catch error=>>", error);
      throw error;
    }
  }
}
