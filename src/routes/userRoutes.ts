import { Application, Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware as auth } from "../middlewares/authMiddleware";
export class UserRoutes {
  private user_controller: UserController = new UserController();

  public route(app: Application) {
    app.post("/api/user", auth, (req: Request, res: Response) => {
      this.user_controller.create_user(req, res);
    });

    app.get("/api/user/:id", auth, (req: Request, res: Response) => {
      this.user_controller.get_user(req, res);
    });

    app.put("/api/user/:id", auth, (req: Request, res: Response) => {
      this.user_controller.update_user(req, res);
    });

    app.delete("/api/user/:id", auth, (req: Request, res: Response) => {
      this.user_controller.delete_user(req, res);
    });

    app.get("/api/user", auth, (req: Request, res: Response) => {
      this.user_controller.getAllUsers(req, res);
    });
  }
}
