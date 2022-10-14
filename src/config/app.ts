import express, { Request } from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { CommonRoutes } from "../routes/commonRoutes";
import { UserRoutes } from "../routes/userRoutes";
import { TestRoutes } from "../routes/test_routes";
import { AuthRoute } from "../routes/authRoutes";
import environment from "../environment";
import cors from "cors";

class App {
  public app: express.Application;
  private db_conn_url = environment.getConnectionString();
  private test_routes: TestRoutes = new TestRoutes(); // test routes
  private common_routes: CommonRoutes = new CommonRoutes(); // wildcard routes if not path match return message invalid url;
  private user_routes: UserRoutes = new UserRoutes();
  private auth_routes: AuthRoute = new AuthRoute();
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.auth_routes.route(this.app);
    this.test_routes.route(this.app);
    this.user_routes.route(this.app);

    this.common_routes.route(this.app); // *** keep it(common_routes) always as the last route inside the constructor
  }

  private config(): void {
    const corse_options: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
      ],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false,
    };
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors(corse_options));
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.db_conn_url)
      .then((res) => {
        console.info("db connected!");
      })
      .catch((err) => {
        console.error("error to connect with db:", err);
      });
  }
}

export default new App().app;
