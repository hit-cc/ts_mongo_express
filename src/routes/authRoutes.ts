import { AuthController } from "./../controllers/authController";
import { Application, Request, Response } from "express";

export class AuthRoute {
  private auth_controller: AuthController = new AuthController();
  public route(app: Application) {
    app.post("/api/auth/login", (req: Request, res: Response) => {
      this.auth_controller.loginOne(req, res);
    });

    app.post("/api/auth/register", (req: Request, res: Response) => {
      this.auth_controller.registerOne(req, res);
    });
  }
}
