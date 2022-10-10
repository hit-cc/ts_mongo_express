enum Environments {
  local_environment = "local",
  dev_environment = "dev",
  prod_environment = "prod",
  qa_environment = "qa",
}

class Environment {
  private environment: String;
  private _MONGO_USER = "cccmongodb";
  private _MONGO_PASS = "ccc1_mongodb";
  constructor(environment: String) {
    this.environment = environment;
  }

  getPort(): Number {
    let port = null;
    this.environment === Environments.prod_environment
      ? (port = 8081)
      : this.environment === Environments.dev_environment
      ? (port = 8082)
      : this.environment === Environments.qa_environment
      ? (port = 8083)
      : (port = 3000);
    return port;
  }

  getDBName(): String {
    let db_name = "";
    this.environment === Environments.prod_environment
      ? (db_name = "db_ts_mongo_express_prod")
      : this.environment === Environments.dev_environment
      ? (db_name = "db_ts_mongo_express_dev")
      : this.environment === Environments.qa_environment
      ? (db_name = "db_ts_mongo_express_qa")
      : (db_name = "db_ts_mongo_express_local");
    return db_name;
  }

  getMongoUser(): string {
    return this._MONGO_USER;
  }

  getMongoPass(): string {
    return this._MONGO_PASS;
  }
}

export default new Environment(Environments.local_environment);
