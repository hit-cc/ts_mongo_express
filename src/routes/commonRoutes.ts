import { Application, Request, Response } from "express";

export class CommonRoutes {
  public route(app: Application) {
    /**
     * Mismatch URL
     *  note :- wildcard routes if no path match return message
     * */
    app.all("*", (req: Request, res: Response) => {
      res.status(404).send({ error: true, message: "Check your URL please" });
    });
  }
}
