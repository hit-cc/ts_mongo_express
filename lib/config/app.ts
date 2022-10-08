import express = require("express");
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import env from "../environment";
import { CommonRoutes } from "../routes/commonRoutes";
import { UserRoutes } from "../routes/userRoutes";
import { TestRoutes } from "../routes/test_routes";
class App {
  public app: express.Application;
  private db_conn_url = `mongodb+srv://cccmongodb:ccc1_mongodb@cc-cluster.tyb3i.mongodb.net/db_ts_mongo_express_local`;
  private test_routes: TestRoutes = new TestRoutes(); // test routes
  private common_routes: CommonRoutes = new CommonRoutes(); // wildcard routes if not path match return message invalid url;
  private user_routes: UserRoutes = new UserRoutes();
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.test_routes.route(this.app);
    this.user_routes.route(this.app);

    this.common_routes.route(this.app); // *** keep it(common_routes) always as the last route inside the constructor
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.db_conn_url)
      .then((res) => {
        console.log("db connected!");
      })
      .catch((err) => {
        console.log("error to connect with db:", err);
      });
  }
}

export default new App().app;
