import { Application, Request, Response } from "express";
import { authMiddleware as auth } from "../middlewares/authMiddleware";

export class TestRoutes {
  public route(app: Application) {
    app.get("/api/test", auth, (req: Request, res: Response) => {
      res.status(200).json({
        message: "get test working !!",
      });
    });

    app.post("/api/test", auth, (req: Request, res: Response) => {
      res.status(200).json({
        message: "post test route work~!",
      });
    });
  }
}
